// Builds dist/showcase.html: one self-contained file (markup + CSS + motion + inlined SVG), libs from CDN.
import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';

writeFileSync('.ssr.jsx', `import { renderToStaticMarkup } from 'react-dom/server';
import { Page } from './src/Page.jsx';
export const html = renderToStaticMarkup(<Page />);`);
await esbuild.build({ entryPoints: ['.ssr.jsx'], bundle: true, platform: 'node', format: 'cjs', outfile: '.ssr.out.cjs', jsx: 'automatic', logLevel: 'error' });
const { html } = createRequire(process.cwd() + '/')('./.ssr.out.cjs');
rmSync('.ssr.jsx'); rmSync('.ssr.out.cjs');

const svg = 'data:image/svg+xml;base64,' + readFileSync('public/shoe.svg').toString('base64');
const motion = readFileSync('src/motion.js', 'utf8').replace('export function', 'function');
const page = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>VEXORA · Move forward</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>${readFileSync('src/styles.css', 'utf8')}</style></head>
<body>${html.replace(/<link rel="preload"[^>]*>/g, '').replace('/shoe.svg', svg)}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"></script>
<script>${motion}
initMotion({ gsap, ScrollTrigger, Lenis });</script></body></html>`;
mkdirSync('dist', { recursive: true });
writeFileSync('dist/showcase.html', page);
console.log('dist/showcase.html', (page.length / 1024).toFixed(0) + ' KB');
