import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { stripTypeScriptTypes } from "node:module";

const host = "127.0.0.1";
const port = 4173;
const projectRoot = resolve(import.meta.dirname, "../../../");
const legacyAssetsRoot = resolve(projectRoot, "../nexup-v2/assets");
const webIndex = "/apps/web/index.html";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ts": "text/javascript; charset=utf-8",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url ?? "/", `http://${host}`).pathname;
    const requestedPath = pathname === "/"
      ? webIndex
      : pathname.endsWith("/")
        ? `${pathname}index.html`
        : pathname;
    const isLegacyAsset = requestedPath.startsWith("/legacy-assets/");
    const filePath = isLegacyAsset
      ? resolve(legacyAssetsRoot, `.${requestedPath.slice("/legacy-assets".length)}`)
      : resolve(projectRoot, `.${requestedPath}`);
    const allowedRoot = isLegacyAsset ? legacyAssetsRoot : projectRoot;

    if (filePath !== allowedRoot && !filePath.startsWith(`${allowedRoot}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    const extension = extname(filePath);
    let body = await readFile(filePath);
    if (extension === ".ts") {
      body = stripTypeScriptTypes(body.toString(), { mode: "strip", sourceUrl: pathname });
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    const status = error && typeof error === "object" && "code" in error && error.code === "ENOENT" ? 404 : 500;
    response.writeHead(status).end(status === 404 ? "Not found" : "Preview server error");
  }
});

server.listen(port, host, () => {
  console.log(`NexUp V3 Web preview: http://${host}:${port}/apps/web/`);
});
