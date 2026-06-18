# Riding Path push worker

A small Cloudflare Worker that sends the twice-daily reminder via the
standard Web Push protocol. Free tier, no credit card required.

## What it does

- `POST /api/device` — the app calls this to save a device's push
  subscription + current checklist progress.
- `DELETE /api/device/:id` — removes a device (used if you disable
  reminders in the app).
- `GET /api/send-now` — manual trigger, useful for testing.
- A **cron trigger** (twice a day, see `wrangler.toml`) reads every saved
  device from KV and sends each one a push with their current checklist
  item.

## One-time setup (only you can do this part)

1. **Create a free Cloudflare account**: https://dash.cloudflare.com/sign-up
   — no credit card needed for this.
2. **Create an API token** so I can deploy without your password:
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token" → use the **"Edit Cloudflare Workers"** template.
   - Copy the token (you'll only see it once) and paste it here in chat, or
     set it as an environment variable yourself if you're running these
     commands locally: `export CLOUDFLARE_API_TOKEN=...`
3. Tell me your token (or run the commands below yourself) and I'll:
   - Run `npm run kv:create` to create the KV namespace, then put its id
     into `wrangler.toml`.
   - Run `npm run secret:vapid-private` to upload the VAPID private key as
     a Worker secret (never committed to git).
   - Run `npm run deploy` to publish the Worker.
4. Deploy prints a URL like `https://riding-path-push.<your-subdomain>.workers.dev`
   — that gets pasted into the app's `src/data/pushConfig.js` as `WORKER_URL`.

## Local commands (for reference)

```bash
npm install
npm run kv:create              # prints a KV namespace id — paste into wrangler.toml
npm run secret:vapid-private   # prompts for the VAPID private key, stores it securely
npm run dev                    # local dev server
npm run deploy                 # publish to Cloudflare
```
