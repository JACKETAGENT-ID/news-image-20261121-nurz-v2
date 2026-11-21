// "The World in One Day" — 21 November 2026
// Entry for the make.fun news-image-20261121 competition (nurz, v2).
// Deterministic, Node.js standard library only: copies the pre-made
// broadsheet front-page image (entry.png) to the output directory.
//
// SPDX-License-Identifier: MIT

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

if (!existsSync(source)) {
  console.error(`missing source image: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
const bytes = statSync(dest).size;
console.log(`wrote ${dest} (${bytes} bytes)`);
