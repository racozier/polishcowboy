import { buildPushPayload } from "@block65/webcrypto-web-push";
import CHECKLISTS from "./checklists.json";

const DEVICE_PREFIX = "device:";

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(data, init, origin) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
      ...(init && init.headers),
    },
  });
}

// Mirrors the flattening logic in src/hooks/useChecklistState.js
function buildReminderPayload(device) {
  const lang = device.lang === "en" ? "en" : "pl";
  const checklist =
    CHECKLISTS.find((c) => c.id === device.activeTab) || CHECKLISTS[0];

  const flat = [];
  checklist.milestones.forEach((m) =>
    m.categories.forEach((c) =>
      c.items.forEach((item) => flat.push({ m, c, item }))
    )
  );

  const done = device.progress || {};
  const next = flat.find(({ item }) => !done[item.id]);

  if (!next) {
    return {
      title: checklist.title[lang],
      body:
        lang === "pl"
          ? "Ukończono! Jesteś gotowy/a. 🐎"
          : "All done! You're ready. 🐎",
    };
  }

  return {
    title: `${checklist.title[lang]} — ${next.m.title[lang]}`,
    body: `${next.c.title[lang]}: ${next.item.text[lang]}`,
  };
}

async function listAllDeviceKeys(env) {
  const keys = [];
  let cursor;
  do {
    const page = await env.DEVICES.list({ prefix: DEVICE_PREFIX, cursor });
    keys.push(...page.keys.map((k) => k.name));
    cursor = page.cursor;
    if (page.list_complete) break;
  } while (cursor);
  return keys;
}

async function sendReminders(env) {
  const vapid = {
    subject: env.VAPID_SUBJECT,
    publicKey: env.VAPID_PUBLIC_KEY,
    privateKey: env.VAPID_PRIVATE_KEY,
  };

  const keys = await listAllDeviceKeys(env);

  await Promise.all(
    keys.map(async (key) => {
      const raw = await env.DEVICES.get(key);
      if (!raw) return;
      const device = JSON.parse(raw);
      if (!device.subscription) return;

      const { title, body } = buildReminderPayload(device);

      const message = {
        data: JSON.stringify({ title, body }),
        options: { ttl: 60 * 60 },
      };

      try {
        const payload = await buildPushPayload(message, device.subscription, vapid);
        const res = await fetch(device.subscription.endpoint, payload);
        // 404/410 = the browser/OS revoked this subscription, stop sending to it.
        if (res.status === 404 || res.status === 410) {
          await env.DEVICES.delete(key);
        }
      } catch (err) {
        console.error("push failed for", key, err);
      }
    })
  );
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (url.pathname === "/api/device" && request.method === "POST") {
      const body = await request.json();
      const { deviceId, subscription, lang, activeTab, progress } = body;
      if (!deviceId || !subscription) {
        return json({ error: "deviceId and subscription are required" }, { status: 400 }, origin);
      }
      await env.DEVICES.put(
        `${DEVICE_PREFIX}${deviceId}`,
        JSON.stringify({ subscription, lang, activeTab, progress })
      );
      return json({ ok: true }, {}, origin);
    }

    if (url.pathname.startsWith("/api/device/") && request.method === "DELETE") {
      const deviceId = url.pathname.split("/").pop();
      await env.DEVICES.delete(`${DEVICE_PREFIX}${deviceId}`);
      return json({ ok: true }, {}, origin);
    }

    // Manual trigger for testing: GET /api/send-now (no auth — fine for a
    // personal hobby project, remove or protect if this ever becomes public).
    if (url.pathname === "/api/send-now" && request.method === "GET") {
      await sendReminders(env);
      return json({ ok: true }, {}, origin);
    }

    return json({ error: "not found" }, { status: 404 }, origin);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(sendReminders(env));
  },
};
