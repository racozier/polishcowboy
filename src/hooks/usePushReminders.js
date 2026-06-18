import { useEffect, useRef, useState } from "react";
import { get, set } from "idb-keyval";
import { WORKER_URL, VAPID_PUBLIC_KEY } from "../data/pushConfig";

const DEVICE_ID_KEY = "ridingPath.deviceId.v1";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

async function getOrCreateDeviceId() {
  let id = await get(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    await set(DEVICE_ID_KEY, id);
  }
  return id;
}

// Registers a real Web Push subscription with the browser and syncs it
// (plus current lang/checklist/progress) to the Cloudflare Worker so it can
// send reminders even when the app is fully closed. No-ops gracefully if
// WORKER_URL hasn't been configured yet.
export function usePushReminders({ lang, activeTab, progress, enabled }) {
  const [subscribed, setSubscribed] = useState(false);
  const syncTimer = useRef(null);

  useEffect(() => {
    if (!enabled || !WORKER_URL || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    let cancelled = false;

    (async () => {
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      if (cancelled) return;
      setSubscribed(true);

      const deviceId = await getOrCreateDeviceId();
      await fetch(`${WORKER_URL}/api/device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          subscription: subscription.toJSON(),
          lang,
          activeTab,
          progress,
        }),
      }).catch(() => {});
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Keep the worker's copy of lang/activeTab/progress fresh (debounced) so
  // reminders always reflect what you're currently working on.
  useEffect(() => {
    if (!subscribed || !WORKER_URL) return;

    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(async () => {
      const deviceId = await getOrCreateDeviceId();
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;

      fetch(`${WORKER_URL}/api/device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          subscription: subscription.toJSON(),
          lang,
          activeTab,
          progress,
        }),
      }).catch(() => {});
    }, 1500);

    return () => clearTimeout(syncTimer.current);
  }, [subscribed, lang, activeTab, progress]);

  return { subscribed, pushConfigured: Boolean(WORKER_URL) };
}
