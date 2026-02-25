# SkyPulse — Real-Time 3D Flight Tracker

Track live flights in stunning 3D. Real-time aircraft positions, altitude visualization, and beautiful maps.

![SkyPulse](https://via.placeholder.com/1200x600/0a0a0a/ffffff?text=SkyPulse+3D+Flight+Tracker)

## Features

- ✈️ **Real-time 3D flight tracking** — See aircraft positions with altitude-based coloring
- 🌍 **Global coverage** — Track flights worldwide via OpenSky Network
- 🎨 **Beautiful dark mode UI** — Modern, minimalist design
- 📍 **City presets** — Quick access to major airports
- 🔍 **Flight search** — Find by callsign or ICAO24
- 🎮 **First-person view** — Cockpit-like chase camera
- 📱 **Mobile-friendly** — Responsive design for all devices

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Map:** MapLibre GL JS
- **3D:** Deck.gl 9
- **Data:** OpenSky Network API (free)

## Quick Start

```bash
# Clone
git clone https://github.com/davidgeekom-create/david.git
cd david/aeris-flight

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davidgeekom-create/david/tree/master/aeris-flight)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense Publisher ID | No |

## Monetization

SkyPulse includes a built-in AdBanner component for Google AdSense integration. To enable:

1. Get a Google AdSense account
2. Add your publisher ID as `NEXT_PUBLIC_ADSENSE_ID`
3. Ads will automatically appear

## Mobile Apps

SkyPulse can be wrapped as a mobile app using Capacitor:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init SkyPulse app.skypulse.app
npm run build
npx cap add ios
npx cap add android
```

## License

AGPL-3.0 — See [LICENSE](LICENSE) for details.

Based on [Aeris](https://github.com/kewonit/aeris) by kewonit.

---

Built with ❤️ by David
