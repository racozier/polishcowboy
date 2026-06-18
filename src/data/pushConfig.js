// Filled in after the Cloudflare Worker is deployed (see worker/README.md).
// Until WORKER_URL is set, real background push reminders are simply
// skipped — the foreground (tab-open) reminders still work either way.
export const WORKER_URL = "https://riding-path-push.polishcowboyada.workers.dev";

export const VAPID_PUBLIC_KEY =
  "BFa4SAbtmScNARjp-_PyLO5PqDxX8_tQTs4FFqBKt_99W2TCkpJtq8AGNCjrQvMrxMi4yQTQMrzxQt-mvAXjqZo";
