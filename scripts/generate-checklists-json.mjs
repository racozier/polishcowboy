// Emits public/checklists.json (read by the app's service worker) and
// worker/src/checklists.json (read by the Cloudflare Worker that sends the
// scheduled push notifications) from the single source-of-truth data module.
import { CHECKLISTS } from "../src/data/checklists.js";
import { writeFileSync, mkdirSync } from "node:fs";

const json = JSON.stringify(CHECKLISTS, null, 2);

writeFileSync("public/checklists.json", json);
console.log(`Wrote public/checklists.json (${CHECKLISTS.length} checklists).`);

mkdirSync("worker/src", { recursive: true });
writeFileSync("worker/src/checklists.json", json);
console.log(`Wrote worker/src/checklists.json (${CHECKLISTS.length} checklists).`);

