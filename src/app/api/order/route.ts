import { NextResponse } from "next/server";
import {
  getCategory,
  estimateFor,
  formatCad,
  packages,
  type PackageId,
} from "@/lib/order-catalog";

export const runtime = "nodejs";

type IncomingPhoto = { name?: string; type?: string; dataUrl?: string };
type IncomingOrder = {
  categorySlug?: string;
  taskTitle?: string;
  quantity?: number;
  package?: string;
  description?: string;
  contactName?: string;
  contact?: string;
  photos?: IncomingPhoto[];
  hp?: string; // honeypot
};

const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp"];
const MAX_PHOTOS = 5;
const MAX_TOTAL_BASE64 = 9 * 1024 * 1024; // ~9MB of base64 across all photos

export async function POST(request: Request) {
  let body: IncomingOrder;
  try {
    body = (await request.json()) as IncomingOrder;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden field — accept silently, send nothing.
  if (body.hp && body.hp.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  // --- validation ---------------------------------------------------
  const category = body.categorySlug ? getCategory(body.categorySlug) : undefined;
  if (!category) {
    return NextResponse.json({ error: "Unknown service category." }, { status: 400 });
  }
  const task = category.tasks.find((t) => t.title === body.taskTitle);
  if (!task) {
    return NextResponse.json({ error: "Unknown task." }, { status: 400 });
  }

  const quantity = Math.min(50, Math.max(1, Math.round(Number(body.quantity) || 1)));
  const pkg: PackageId = body.package === "express" ? "express" : "basic";

  const contactName = (body.contactName ?? "").trim().slice(0, 120);
  const contact = (body.contact ?? "").trim().slice(0, 160);
  if (!contactName || !isValidContact(contact)) {
    return NextResponse.json(
      { error: "Please include your name and a phone number or email." },
      { status: 400 },
    );
  }

  const description = (body.description ?? "").trim().slice(0, 2000);

  const photos = Array.isArray(body.photos) ? body.photos.slice(0, MAX_PHOTOS) : [];
  let totalBase64 = 0;
  const attachments: { filename: string; content: string }[] = [];
  for (const [i, photo] of photos.entries()) {
    if (!photo?.dataUrl || typeof photo.dataUrl !== "string") continue;
    const match = /^data:([^;]+);base64,(.+)$/.exec(photo.dataUrl);
    if (!match) continue;
    const mime = match[1];
    const base64 = match[2];
    if (!ALLOWED_IMAGE.includes(mime)) continue;
    totalBase64 += base64.length;
    if (totalBase64 > MAX_TOTAL_BASE64) {
      return NextResponse.json(
        { error: "Photos are too large. Please remove one and try again." },
        { status: 413 },
      );
    }
    const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";
    attachments.push({
      filename: sanitizeName(photo.name, i, ext),
      content: base64,
    });
  }

  const estimate = estimateFor(task, quantity, pkg);
  const pkgName = packages.find((p) => p.id === pkg)?.name ?? pkg;

  const summary = {
    category: category.title,
    task: task.title,
    quantity: `${quantity} ${task.unit}${quantity > 1 ? "s" : ""}`,
    timing: pkgName,
    estimate: `from ${formatCad(estimate)} (indicative)`,
    contactName,
    contact,
    description: description || "(none)",
    photoCount: attachments.length,
  };

  // --- delivery -----------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_TO_EMAIL || "info@handycore.co";
  const from = process.env.ORDER_FROM_EMAIL || "HandyCore Orders <orders@handycore.co>";

  if (!apiKey) {
    // Email not configured yet — never drop the order silently.
    console.warn(
      "[order] RESEND_API_KEY not set — order NOT emailed. Summary:",
      JSON.stringify(summary),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: isEmail(contact) ? contact : undefined,
      subject: `New service request — ${task.title}`,
      html: buildHtml(summary, task.includes),
      attachments,
    });
    if (error) {
      console.error("[order] Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your request. Please call us instead." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[order] send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your request. Please call us instead." },
      { status: 502 },
    );
  }
}

/* ---- helpers ------------------------------------------------------ */
function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidContact(v: string): boolean {
  const t = v.trim();
  if (t.length < 5) return false;
  if (isEmail(t)) return true;
  return t.replace(/[^0-9]/g, "").length >= 7;
}
function sanitizeName(name: string | undefined, i: number, ext: string): string {
  const base = (name || `photo-${i + 1}`).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60);
  return /\.(jpe?g|png|webp)$/i.test(base) ? base : `${base}.${ext}`;
}

function buildHtml(
  s: {
    category: string;
    task: string;
    quantity: string;
    timing: string;
    estimate: string;
    contactName: string;
    contact: string;
    description: string;
    photoCount: number;
  },
  includes: string[],
): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(
      label,
    )}</td><td style="padding:6px 0;color:#121212;font-size:14px;font-weight:600">${escapeHtml(
      value,
    )}</td></tr>`;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#121212;color:#fff;border-radius:16px;padding:20px 24px">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#f4b400">New service request</div>
      <div style="font-size:20px;font-weight:800;margin-top:4px">${escapeHtml(s.task)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-top:16px">
      ${row("Category", s.category)}
      ${row("Includes", includes.join(" · "))}
      ${row("Quantity", s.quantity)}
      ${row("Timing", s.timing)}
      ${row("Estimate", s.estimate)}
      ${row("Name", s.contactName)}
      ${row("Contact", s.contact)}
      ${row("Notes", s.description)}
      ${row("Photos", String(s.photoCount) + " attached")}
    </table>
  </div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}
