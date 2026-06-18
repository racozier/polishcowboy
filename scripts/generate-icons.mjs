import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/icons", { recursive: true });

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff6e1"/>
      <stop offset="100%" stop-color="#f0d99b"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <text x="50%" y="58%" font-size="280" text-anchor="middle" dominant-baseline="middle">🐎</text>
</svg>`;

const sizes = [192, 512];

for (const size of sizes) {
  await sharp(Buffer.from(svg(size)))
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}.png`);
}

await sharp(Buffer.from(svg(512)))
  .resize(512, 512)
  .png()
  .toFile("public/icons/icon-maskable-512.png");

console.log("Icons generated.");
