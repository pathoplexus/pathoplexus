import { g as getConfiguredImageService, i as imageConfig, a as isRemoteAllowed, b as assetsDir, o as outDir } from '../chunks/_astro_assets_GucvUgu0.mjs';
import { readFile } from 'node:fs/promises';
import { isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { i as isRemotePath } from '../chunks/path_hV-dQId8.mjs';
import * as mime from 'mrmime';
export { renderers } from '../renderers.mjs';

const fnv1a52 = (str) => {
  const len = str.length;
  let i = 0, t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
  while (i < len) {
    v0 ^= str.charCodeAt(i++);
    t0 = v0 * 435;
    t1 = v1 * 435;
    t2 = v2 * 435;
    t3 = v3 * 435;
    t2 += v0 << 8;
    t3 += v1 << 8;
    t1 += t0 >>> 16;
    v0 = t0 & 65535;
    t2 += t1 >>> 16;
    v1 = t1 & 65535;
    v3 = t3 + (t2 >>> 16) & 65535;
    v2 = t2 & 65535;
  }
  return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ v3 >> 4);
};
const etag = (payload, weak = false) => {
  const prefix = weak ? 'W/"' : '"';
  return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
};

async function loadLocalImage(src, url) {
  const assetsDirPath = fileURLToPath(assetsDir);
  let fileUrl;
  {
    try {
      const idx = url.pathname.indexOf("/_image");
      if (idx > 0) {
        src = src.slice(idx);
      }
      fileUrl = new URL("." + src, outDir);
      const filePath = fileURLToPath(fileUrl);
      if (!isAbsolute(filePath) || !filePath.startsWith(assetsDirPath)) {
        return void 0;
      }
    } catch {
      return void 0;
    }
  }
  let buffer = void 0;
  try {
    buffer = await readFile(fileUrl);
  } catch {
    try {
      const sourceUrl = new URL(src, url.origin);
      buffer = await loadRemoteImage(sourceUrl);
    } catch (err) {
      console.error("Could not process image request:", err);
      return void 0;
    }
  }
  return buffer;
}
async function loadRemoteImage(src) {
  try {
    const res = await fetch(src);
    if (!res.ok) {
      return void 0;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return void 0;
  }
}
const GET = async ({ request }) => {
  try {
    const imageService = await getConfiguredImageService();
    if (!("transform" in imageService)) {
      throw new Error("Configured image service is not a local service");
    }
    const url = new URL(request.url);
    const transform = await imageService.parseURL(url, imageConfig);
    if (!transform?.src) {
      const err = new Error(
        "Incorrect transform returned by `parseURL`. Expected a transform with a `src` property."
      );
      console.error("Could not parse image transform from URL:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
    let inputBuffer = void 0;
    if (isRemotePath(transform.src)) {
      if (isRemoteAllowed(transform.src, imageConfig) === false) {
        return new Response("Forbidden", { status: 403 });
      }
      inputBuffer = await loadRemoteImage(new URL(transform.src));
    } else {
      inputBuffer = await loadLocalImage(transform.src, url);
    }
    if (!inputBuffer) {
      return new Response("Internal Server Error", { status: 500 });
    }
    const { data, format } = await imageService.transform(inputBuffer, transform, imageConfig);
    return new Response(Buffer.from(data), {
      status: 200,
      headers: {
        "Content-Type": mime.lookup(format) ?? `image/${format}`,
        "Cache-Control": "public, max-age=31536000",
        ETag: etag(data.toString()),
        Date: (/* @__PURE__ */ new Date()).toUTCString()
      }
    });
  } catch (err) {
    console.error("Could not process image request:", err);
    return new Response(
      `Internal Server Error`,
      {
        status: 500
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
