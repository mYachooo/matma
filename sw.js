/* ═══════════════════════════════════════════
   Service Worker — Matematyka Fiszki PWA
   v2 — zaktualizowany wraz z nową wersją aplikacji
═══════════════════════════════════════════ */

const CACHE_NAME = 'matma-fiszki-v2';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Righteous&family=Nunito:wght@400;600;700;800&display=swap',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.allSettled(PRECACHE_URLS.map(url => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
