// Spanish 15 — service worker.
// index.html and vocab.js: try the network first (so updates show on the next launch), fall back to cache offline.
// Fonts and icons: cache first.
const CACHE = "sp15-v3";
const CORE = ["./", "./index.html", "./vocab.js", "./manifest.webmanifest"];
const EXTRAS = ["./icon-180.png", "./icon-192.png", "./icon-512.png",
  "./fonts/Barlow-Regular.woff2", "./fonts/Barlow-Medium.woff2", "./fonts/Barlow-SemiBold.woff2", "./fonts/BarlowCondensed-SemiBold.woff2", "./fonts/BarlowCondensed-Bold.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => Promise.allSettled(EXTRAS.map(a => c.add(a).catch(() => {}))))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const path = url.pathname;
  const isShell = req.mode === "navigate" || path.endsWith("/") || path.endsWith("index.html") || path.endsWith("vocab.js") || path.endsWith("manifest.webmanifest");
  e.respondWith(caches.open(CACHE).then(async c => {
    if (isShell) {
      try { const r = await withTimeout(fetch(req, {cache: "no-store"}), 4000); if (r.ok) c.put(req, r.clone()); return r; }
      catch (err) { const cached = await c.match(req, {ignoreSearch: true}); if (cached) return cached; throw err; }
    }
    const cached = await c.match(req, {ignoreSearch: true});
    if (cached) return cached;
    const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r;
  }));
});
