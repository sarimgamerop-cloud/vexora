import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const watch = process.argv.includes('--watch');
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true });
cpSync('index.html', 'dist/index.html');

const opts = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outfile: 'dist/app.js',
  jsx: 'automatic',
  minify: !watch,
  sourcemap: watch,
  target: 'es2020',
  loader: { '.css': 'css' },
  define: { 'process.env.NODE_ENV': watch ? '"development"' : '"production"' },
  logLevel: 'info',
};

if (watch) {
  const ctx = await esbuild.context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: 'dist', port: 3000 });
  console.log(`dev → http://localhost:${port}`);
} else {
  await esbuild.build(opts);
}
