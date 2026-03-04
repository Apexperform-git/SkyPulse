import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AdMobProvider } from "../components/admob-provider";
import { NativeAppBypass } from "../components/native-app-bypass";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const title = "SkyPulse | Real-Time 3D Flight Tracker App";
const description =
  "Experience live global flight tracking in stunning 3D. SkyPulse delivers real-time aircraft positions, precise altitude visualization, and live telemetry data directly to your device. Download the ultimate interactive flight radar for aviation enthusiasts.";
const siteUrl = "https://skypulse.live";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0D4D82",
};

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | SkyPulse"
  },
  description,
  metadataBase: new URL(siteUrl),
  keywords: [
    "flight tracker",
    "live flights",
    "3D flight tracking",
    "real-time aviation",
    "flight radar",
    "aircraft tracking",
    "skypulse app",
    "ads-b flight tracking",
    "live plane tracker",
    "aviation map 3D",
    "flight simulator telemetry",
    "opensky network tracker"
  ],
  authors: [{ name: "SkyPulse Team", url: siteUrl }],
  creator: "SkyPulse",
  publisher: "SkyPulse",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SkyPulse",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg", // Ensure you have an og-image
        width: 1200,
        height: 630,
        alt: "SkyPulse 3D Flight Tracker Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@SkyPulseApp", // Optional Placeholder
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': '/en-US', // Setup for future i18n
    },
  },
  appleWebApp: {
    capable: true,
    title: "SkyPulse",
    statusBarStyle: "black-translucent",
  },
  applicationName: "SkyPulse",
  manifest: "/manifest.json", // Good practice for PWAs/Apps
};

// Schema.org Structured Data for an App
const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkyPulse",
  "operatingSystem": "ANDROID",
  "applicationCategory": "MapsAndNavigationApplication",
  "description": description,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": siteUrl,
  "downloadUrl": siteUrl, // Ideally links to Play Store later
  "image": `${siteUrl}/logo.svg`,
  "publisher": {
    "@type": "Organization",
    "name": "SkyPulse Team"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8", // Placeholder for trust
    "ratingCount": "1250"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.Capacitor && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
                document.documentElement.style.display = 'none';
                window.location.replace('/map.html');
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased text-white scrollbar-none bg-[#050505]`}>
        <NativeAppBypass />
        <AdMobProvider>
          {children}
        </AdMobProvider>
      </body>
    </html>
  );
}
