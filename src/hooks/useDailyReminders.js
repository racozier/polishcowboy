import { useEffect, useState } from "react";

const TIMES_KEY = "ridingPath.reminderTimes.v1";
const LAST_FIRED_KEY = "ridingPath.lastFired.v1";

const DEFAULT_TIMES = ["09:00", "19:00"];

function loadTimes() {
  try {
    const raw = localStorage.getItem(TIMES_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_TIMES;
  } catch {
    return DEFAULT_TIMES;
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// Fires a browser notification twice a day (default 09:00 / 19:00) while the app is open,
// reminding about the current checklist's next unfinished sub-checkpoint.
// Note: true background push (app closed) needs a server + service worker push subscription;
// this is a best-effort client-side reminder that works whenever the tab/PWA is running.
export function useDailyReminders(getReminderPayload) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [times, setTimes] = useState(loadTimes);

  useEffect(() => {
    localStorage.setItem(TIMES_KEY, JSON.stringify(times));
  }, [times]);

  const requestPermission = async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  useEffect(() => {
    if (permission !== "granted") return;

    const checkAndFire = () => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      if (!times.includes(hhmm)) return;

      const fired = JSON.parse(localStorage.getItem(LAST_FIRED_KEY) || "{}");
      const key = `${hhmm}_${todayKey()}`;
      if (fired[key]) return;

      const payload = getReminderPayload();
      if (!payload) return;

      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon,
      });

      localStorage.setItem(
        LAST_FIRED_KEY,
        JSON.stringify({ ...fired, [key]: true })
      );
    };

    const interval = setInterval(checkAndFire, 30000);
    checkAndFire();
    return () => clearInterval(interval);
  }, [permission, times, getReminderPayload]);

  return { permission, requestPermission, times, setTimes };
}
