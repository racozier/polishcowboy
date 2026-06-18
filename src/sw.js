import { precacheAndRoute } from "workbox-precaching";
import { get } from "idb-keyval";

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// self.registration.scope already includes the deployed base path (e.g.
// https://user.github.io/polishcowboy/), so it works both locally and on Pages.
const BASE = self.registration.scope;

async function buildReminderPayload() {
  const [progress, activeTab, lang] = await Promise.all([
    get("ridingPath.progress.v1"),
    get("ridingPath.activeTab.v1"),
    get("ridingPath.lang.v1"),
  ]);

  const res = await fetch(`${BASE}checklists.json`);
  const checklists = await res.json();
  const checklist = checklists.find((c) => c.id === activeTab) || checklists[0];
  const lng = lang === "en" ? "en" : "pl";

  const flat = [];
  checklist.milestones.forEach((m) =>
    m.categories.forEach((c) => c.items.forEach((item) => flat.push({ m, c, item })))
  );
  const done = progress || {};
  const next = flat.find(({ item }) => !done[item.id]);

  if (!next) {
    return {
      title: checklist.title[lng],
      body:
        lng === "pl"
          ? "Ukończono! Jesteś gotowy/a. 🐎"
          : "All done! You're ready. 🐎",
    };
  }

  return {
    title: `${checklist.title[lng]} — ${next.m.title[lng]}`,
    body: `${next.c.title[lng]}: ${next.item.text[lng]}`,
  };
}

async function showReminder() {
  const payload = await buildReminderPayload();
  await self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: `${BASE}icons/icon-192.png`,
    badge: `${BASE}icons/icon-192.png`,
    tag: "riding-path-reminder",
  });
}

// Best-effort background trigger. Chrome/Android only, installed PWA only,
// and the browser decides the actual firing time/frequency around the
// requested minInterval — it is not a guaranteed 9am/7pm alarm.
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "riding-path-reminder") {
    event.waitUntil(showReminder());
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientsArr) => {
      const existing = clientsArr.find((c) => c.url.startsWith(BASE));
      if (existing) return existing.focus();
      return self.clients.openWindow(BASE);
    })
  );
});
