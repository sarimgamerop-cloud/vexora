// Tiny static server for the built site: `npm run build && npm start`
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
const root = new URL('./dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  try {
    const file = await readFile(join(root, path === '/' ? 'index.html' : path));
    res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'text/html', 'Cache-Control': 'public, max-age=3600' });
    res.end(file);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(process.env.PORT || 3000, () => console.log('VEXORA → http://localhost:' + (process.env.PORT || 3000)));
