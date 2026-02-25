import { FlightTracker } from "@/components/flight-tracker";
import { TopAdBanner } from "@/components/ui/top-ad-banner";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SkyPulse",
  url: "https://skypulse.live",
  description:
    "Track live flights in stunning 3D. Real-time aircraft positions, altitude visualization, and beautiful maps.",
  applicationCategory: "TravelApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "SkyPulse" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <TopAdBanner />
      <FlightTracker />
    </>
  );
}
