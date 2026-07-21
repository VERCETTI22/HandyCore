import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://www.handycore.co";

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
  verification: {
    google: "nVUFm_IE28iQ0vRHXcex2HU7IAIQ9JeGmoREnpCnmVI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
