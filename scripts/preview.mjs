// Local preview of the exact Pages artifact, with no Next.js server or dependencies.
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};
await stat(resolve(root, "index.html")).catch(() => {
  console.error("Сначала выполните npm run build.");
  process.exit(1);
});
const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (base && pathname !== base && !pathname.startsWith(`${base}/`)) {
    response.writeHead(404).end();
    return;
  }
  const file = resolve(root, `.${pathname.slice(base.length) || "/"}`);
  if (file !== root && !file.startsWith(`${root}${sep}`)) {
    response.writeHead(404).end();
    return;
  }
  let target = file;
  let info;
  let status = 200;
  try {
    info = await stat(target);
    if (info.isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { Location: `${pathname}/` }).end();
        return;
      }
      target = resolve(target, "index.html");
      info = await stat(target);
    }
    if (!info.isFile()) throw new Error("Not a file");
  } catch {
    target = resolve(root, "404.html");
    info = await stat(target).catch(() => null);
    status = 404;
  }
  if (!info) {
    response.writeHead(404).end();
    return;
  }
  const headers = {
    "Content-Type": types[extname(target)] || "application/octet-stream",
    "Cache-Control": "no-store",
    "Accept-Ranges": "bytes",
  };
  let start = 0;
  let end = info.size - 1;
  if (request.headers.range && status === 200) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (match && (match[1] || match[2])) {
      start = match[1]
        ? Number(match[1])
        : Math.max(0, info.size - Number(match[2]));
      end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
    }
    if (
      !match ||
      !(match[1] || match[2]) ||
      start > end ||
      start < 0 ||
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end)
    ) {
      response
        .writeHead(416, { "Content-Range": `bytes */${info.size}` })
        .end();
      return;
    }
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
  }
  headers["Content-Length"] = end - start + 1;
  response.writeHead(status, headers);
  if (request.method === "HEAD" || !info.size) {
    response.end();
    return;
  }
  const stream = createReadStream(target, { start, end });
  stream.on("error", () => response.destroy());
  response.on("close", () => stream.destroy());
  stream.pipe(response);
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Preview: http://localhost:${port}${base}/`),
);
