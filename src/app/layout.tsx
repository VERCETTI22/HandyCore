import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://handycore.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HandyCore — Professional Handyman Services in Ottawa",
    template: "%s · HandyCore",
  },
  description:
    "Reliable handyman services for homeowners in Ottawa. Furniture assembly, painting, door repair, TV mounting and general repairs. Fast response, honest pricing, professional results.",
  keywords: [
    "handyman Ottawa",
    "furniture assembly Ottawa",
    "TV mounting Ottawa",
    "painting Ottawa",
    "door repair",
    "home repairs Ottawa",
  ],
  openGraph: {
    title: "HandyCore — Professional Handyman Services in Ottawa",
    description:
      "Reliable handyman services for homeowners in Ottawa. Fast response, honest pricing, professional results.",
    url: siteUrl,
    siteName: "HandyCore",
    locale: "en_CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={montserrat.variable}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
