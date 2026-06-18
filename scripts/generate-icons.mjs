import sharp from "sharp";
import { mkdirSync } from "node:fs";

mkdirSync("public/icons", { recursive: true });

// Classic horse-head-and-neck profile (knight-piece silhouette), facing left,
// with a jagged mane along the back of the neck and a cut-out eye.
const HEAD_PATH = `
M 130 4
L 120 14
Q 70 24 14 50
Q 2 56 6 64
L 12 68
Q 18 72 26 73
L 34 78
Q 55 88 80 80
Q 92 76 100 70
Q 110 58 112 50
Q 116 70 122 92
L 130 98
L 138 86
L 127 73
L 135 60
L 124 47
L 132 35
L 121 22
L 130 4
Z
`;

const EYE_PATH = `M 75 38 A 6 6 0 1 0 75 50 A 6 6 0 1 0 75 38 Z`;

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff6e1"/>
      <stop offset="100%" stop-color="#f0d99b"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <g transform="translate(71,123) scale(2.6)">
    <path d="${HEAD_PATH}" fill="#4a3320"/>
    <path d="${EYE_PATH}" fill="#f0d99b"/>
  </g>
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
