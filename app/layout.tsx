import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Data Fetching Patterns",
    default: "Data Fetching Patterns",
  },
  description:
    "Explore modern data fetching patterns in Next.js 16 with React Query, SWR, and React 19. Learn server components, streaming, hydration, and caching strategies.",
  keywords: [
    "Next.js",
    "React Query",
    "SWR",
    "React 19",
    "Data Fetching",
    "Server Components",
    "Suspense",
    "Streaming",
  ],
  authors: [{ name: "maxmurr", url: "https://github.com/maxmurr" }],
  creator: "maxmurr",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Data Fetching Patterns",
    title: "Data Fetching Patterns",
    description:
      "Explore modern data fetching patterns in Next.js 16 with React Query, SWR, and React 19.",
    images: [
      {
        url: "/og-image.png",
        width: 2848,
        height: 1504,
        alt: "Data Fetching Patterns - Next.js 16 + React 19 + Elysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Fetching Patterns",
    description:
      "Explore modern data fetching patterns in Next.js 16 with React Query, SWR, and React 19.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
