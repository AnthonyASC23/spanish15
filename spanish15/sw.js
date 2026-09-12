// Spanish 15 — service worker: caches the app shell so it works offline once installed.
const CACHE = "sp15-v2";
const CORE = ["./", "./index.html", "./vocab.js", "./manifest.webmanifest"];
const EXTRAS = ["./icon-180.png", "./icon-192.png", "./icon-512.png",
  "./fonts/Barlow-Regular.woff2", "./fonts/Barlow-Medium.woff2", "./fonts/Barlow-SemiBold.woff2", "./fonts/BarlowCondensed-SemiBold.woff2", "./fonts/BarlowCondensed-Bold.woff2"];

self.addEventListener("install", e => {
  // Core files must cache; icons and fonts are nice-to-have (a missing fonts folder shouldn't block offline mode).
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => Promise.allSettled(EXTRAS.map(a => c.add(a).catch(() => {}))))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // Serve from cache immediately, refresh in the background.
    e.respondWith(caches.open(CACHE).then(async c => {
      const cached = await c.match(req, {ignoreSearch: true});
      const fresh = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => cached);
      return cached || fresh;
    }));
  }
});
