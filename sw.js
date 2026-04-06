/* ClassTapMark service worker
   Optimized for GitHub Pages + low bandwidth
*/

const CACHE_NAME = 'ClassTapMark-cache-v2-2026-04-06';

const CDN_XLSX =
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon-32.png',
  './icon192x192.png',
  './icon256x256.png',
  './icon384x384.png',
  './icon512x512.png'
];

// INSTALL: precache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// ACTIVATE: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH: cache-first with safe fallbacks
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // CDN XLSX: stale-while-revalidate
  if (request.url === CDN_XLSX) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then(response => {
          cache.put(request, response.clone());
          return response;
        });
        return cached || networkFetch;
      })
    );
    return;
  }

  // Default: cache-first
  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      } catch {
        // Navigation fallback
        if (request.mode === 'navigate') {
          return cache.match('./index.html');
        }
      }
    })
  );
});
