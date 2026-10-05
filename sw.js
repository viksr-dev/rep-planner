// Keeps the app working offline. Bump VERSION whenever app files change so
// phones pick up the new version.
const VERSION = 'v3';
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/app.js',
  'data/exercises.json',
  'icons/icon-192.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;
  // Exercise photos are cached the first time they are opened, so they work offline after that.
  if (url.pathname.includes('/lib/')) {
    event.respondWith(caches.open(VERSION).then((c) => c.match(event.request).then((hit) => hit
      || fetch(event.request).then((res) => { if (res.ok) c.put(event.request, res.clone()); return res; }))));
    return;
  }
  // App files: use the network when online so updates arrive, fall back to the cache offline.
  event.respondWith(
    fetch(event.request).then((res) => {
      if (res.ok) caches.open(VERSION).then((c) => c.put(event.request, res.clone()));
      return res;
    }).catch(() => caches.match(event.request, { ignoreSearch: true })),
  );
});
