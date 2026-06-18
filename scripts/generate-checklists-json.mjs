// Emits public/checklists.json from the source-of-truth data module so the
// service worker (which can't import JSX/ESM app modules at runtime) can
// fetch the same checklist structure to compute reminder text offline.
import { CHECKLISTS } from "../src/data/checklists.js";
import { writeFileSync } from "node:fs";

writeFileSync("public/checklists.json", JSON.stringify(CHECKLISTS, null, 2));
console.log(`Wrote public/checklists.json (${CHECKLISTS.length} checklists).`);
