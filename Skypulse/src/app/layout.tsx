import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const title = "SkyPulse — Real-Time 3D Flight Tracker";
const description =
  "Track live flights in stunning 3D. Real-time aircraft positions, altitude visualization, and beautiful maps. Free flight radar for aviation enthusiasts.";
const siteUrl = "https://skypulse.live";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  keywords: [
    "flight tracker",
    "live flights",
    "3D flight tracking",
    "real-time aviation",
    "flight radar",
    "aircraft tracking",
    "skypulse",
    "opensky",
  ],
  authors: [{ name: "SkyPulse" }],
  creator: "SkyPulse",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SkyPulse",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-2675217460226988" />
        {/* AdSense script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2675217460226988"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
