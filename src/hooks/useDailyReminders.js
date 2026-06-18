import { useEffect, useState } from "react";

const LAST_FIRED_KEY = "ridingPath.lastFired.v1";
const TIMES = ["09:00", "19:00"];
const PERIODIC_SYNC_TAG = "riding-path-reminder";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

async function tryRegisterPeriodicSync() {
  try {
    const registration = await navigator.serviceWorker.ready;
    if (!("periodicSync" in registration)) return false;

    const status = await navigator.permissions.query({ name: "periodic-background-sync" });
    if (status.state !== "granted") return false;

    await registration.periodicSync.register(PERIODIC_SYNC_TAG, {
      minInterval: 12 * 60 * 60 * 1000, // ~twice a day, browser decides exact timing
    });
    return true;
  } catch {
    return false;
  }
}

// Foreground reminders (09:00 / 19:00) — reliable whenever the app/tab is open.
// Periodic Background Sync (registered separately, Chrome/Android-installed-PWA
// only) is attempted as a best-effort background fallback for when the app
// is closed; the OS/browser decides actual timing, it's not a guaranteed alarm.
export function useDailyReminders(getReminderPayload) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [periodicSyncActive, setPeriodicSyncActive] = useState(false);

  const requestPermission = async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted" && "serviceWorker" in navigator) {
      const ok = await tryRegisterPeriodicSync();
      setPeriodicSyncActive(ok);
    }
  };

  useEffect(() => {
    if (permission !== "granted" || !("serviceWorker" in navigator)) return;
    tryRegisterPeriodicSync().then(setPeriodicSyncActive);
  }, [permission]);

  useEffect(() => {
    if (permission !== "granted") return;

    const checkAndFire = () => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      if (!TIMES.includes(hhmm)) return;

      const fired = JSON.parse(localStorage.getItem(LAST_FIRED_KEY) || "{}");
      const key = `${hhmm}_${todayKey()}`;
      if (fired[key]) return;

      const payload = getReminderPayload();
      if (!payload) return;

      new Notification(payload.title, { body: payload.body });
      localStorage.setItem(LAST_FIRED_KEY, JSON.stringify({ ...fired, [key]: true }));
    };

    const interval = setInterval(checkAndFire, 30000);
    checkAndFire();
    return () => clearInterval(interval);
  }, [permission, getReminderPayload]);

  return { permission, requestPermission, periodicSyncActive, times: TIMES };
}
