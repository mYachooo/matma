/* ═══════════════════════════════════════════
   Service Worker — Matematyka Fiszki PWA
   Strategia: Cache First dla zasobów statycznych
═══════════════════════════════════════════ */

const CACHE_NAME = 'matma-fiszki-v1';

// Pliki do zapisania w cache przy instalacji
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Righteous&family=Nunito:wght@400;600;700;800&display=swap',
];

/* ── INSTALL: zapisz zasoby w cache ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Próbujemy cache'ować po jednym — żeby błąd jednego nie blokował reszty
        return Promise.allSettled(
          PRECACHE_URLS.map(url => cache.add(url).catch(() => {}))
        );
      })
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: usuń stare cache ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: Cache First, sieć jako fallback ── */
self.addEventListener('fetch', event => {
  // Pomijamy żądania inne niż GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Nie ma w cache — pobierz z sieci i zapisz
      return fetch(event.request)
        .then(response => {
          // Zapisuj tylko poprawne odpowiedzi
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Offline i nie ma w cache — zwróć stronę główną jako fallback
          return caches.match('./index.html') || caches.match('./');
        });
    })
  );
});
