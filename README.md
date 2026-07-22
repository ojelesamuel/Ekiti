# EkitiWorks — Project Omoluabi Digital

Civic micro-tasking, tax mapping, and agricultural portal for Ekiti State, Nigeria.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Route map

- `/` — master landing gateway
- `/voice-hub` — audio-first Ekiti Yoruba voice portal (citizens)
- `/market` — farm-to-market produce exchange (citizens)
- `/radar` — 10-metre geofenced task radar (taskers)
- `/wallet` — payouts and civic score (taskers)
- `/igr-analytics` — state executive command deck (government)

## Notes on simulated systems

- **Geofencing**: `context/LocationContext.tsx` simulates GPS position and a 10-metre
  zone lock (30-minute expiry). Wire `simulateMovement` to the browser Geolocation API
  for production use.
- **Voice capture**: `components/voice/VoicePortal.tsx` uses the Web Speech API
  (`SpeechRecognition`) where available, with a graceful fallback that still records
  duration and lets the citizen confirm/submit without a transcript.
- **Split settlement**: `context/WalletContext.tsx` applies an 80/20
  treasury/tasker split on every verified task payout — replace `settleTaskPayout`
  with a call to your payments/treasury API.
- **Images**: the hero and market sections use the two real Ekiti State photography
  URLs provided in the brief, wired through `next/image` with `remotePatterns`
  configured in `next.config.js`. Swap in your own CDN-hosted assets for production
  to avoid depending on third-party hotlinking.
