import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/lib/content";
import { Providers } from "@/components/Providers";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings } = await getSiteContent();
    return {
      title: settings?.siteTitle || "Dr. Mwenya Mubanga",
      description: settings?.siteDescription || "Physician-scientist and public health leader",
      keywords: settings?.keywords?.split(",").map((k) => k.trim()),
      openGraph: {
        title: settings?.siteTitle || "Dr. Mwenya Mubanga",
        description: settings?.siteDescription || "",
        type: "website",
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return { title: "Dr. Mwenya Mubanga", description: "Physician-scientist and public health leader" };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router layout; Google Fonts link is intentional */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
