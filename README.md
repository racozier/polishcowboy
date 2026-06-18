# Droga do Instruktora — Riding Path

A PWA checklist app for becoming a horse riding instructor, horse behavioralist,
and hippotherapy instructor. Three full knowledge checklists (milestones →
categories → items), PL/EN toggle, progress saved locally, and twice-daily
reminders about the active checklist's current checkpoint.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build          # local build, served from /
npm run build:pages    # GitHub Pages build, served from /polishcowboy/
```

## Deploy (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` builds and deploys `dist/` on
every push to `main`. One-time setup in the repo:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site will be published at `https://<your-username>.github.io/polishcowboy/`.

## Notifications

- **Foreground reminders** (09:00 / 19:00 local time) fire reliably whenever
  the app is open in a tab — no extra setup beyond granting notification
  permission in the app.
- **Background reminders**: the app registers a service worker and, on
  supported browsers, the [Periodic Background Sync API](https://developer.chrome.com/docs/capabilities/periodic-background-sync)
  to also show reminders when the app isn't open. This only works for the
  app **installed as a PWA** (Add to Home Screen / Install app) on
  Chrome-based browsers on Android/desktop. The browser — not the app —
  decides the exact timing/frequency around the requested ~12h interval; it
  is not a guaranteed alarm. Safari/iOS does not support Periodic Background
  Sync, so background reminders there aren't possible without a native app
  or a push-notification server (which GitHub Pages, being static hosting,
  can't run).
