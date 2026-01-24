
/* ClassTapMark service worker
   - Preserves your cache-first strategy
   - Pre-caches cdnjs XLSX for offline use
   - Safer fallback to ./index.html for navigations
*/

const CACHE_NAME = 'ClassTapMark-cache-v2-2026-01-24';
const CDN_XLSX = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

// Use relative paths so they resolve correctly at /ClassTapMark/ (GitHub Pages) and on localhost
const URLS_TO_CACHE = [
  './',                 // directory index
  './index.html',
  './manifest.json',
  './sw.js',
  './favicon-32.png',
  './icon192x192.png',
  './icon256x256.png',
  './icon384x384.png',
  './icon512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Precache local app shell
    // await cache.addAll(URLS_TO_CACHE.concat(LEGACY_ABSOLUTE));

    // Precache the CDN XLSX file.
    // Try CORS first; if blocked, fall back to caching an opaque response (no-cors),
    // which is still fine for offline execution.
    try {
      await cache.add(CDN_XLSX);
    } catch (err) {
      try {
        const opaqueResp = await fetch(new Request(CDN_XLSX, { mode: 'no-cors' }));
        await cache.put(CDN_XLSX, opaqueResp);
      } catch (_) {
        // If this also fails (e.g., first visit fully offline), we'll rely on runtime caching later
      }
    }

    // Make the new SW activate as soon as possible
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((k) => (k === CACHE_NAME ? undefined : caches.delete(k)))
    );
    // Control existing clients without a manual reload
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Special handling for the CDN XLSX: stale-while-revalidate
  if (request.url === CDN_XLSX) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      const networkPromise = fetch(request)
        .then((resp) => {
          if (resp && (resp.ok || resp.type === 'opaque')) {
            cache.put(request, resp.clone()).catch(() => {});
          }
          return resp;
        })
        .catch(() => undefined);

      // Prefer cached offline; else use fresh network; else fail gracefully
      return cached || networkPromise || new Response('', { status: 504, statusText: 'Offline and not cached' });
    })());
    return;
  }

  // Default: cache-first, then network, then offline fallback for navigations
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const resp = await fetch(request);
      // Optionally cache successful responses for future offline use
      if (resp && resp.ok) {
        cache.put(request, resp.clone()).catch(() => {});
      }
      return resp;
    } catch (err) {
      // If this was a navigation request, fall back to the app shell
      if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      // Last resort: try any cached match again or return a 504
      return (await cache.match(request)) || new Response('', { status: 504, statusText: 'Offline and not cached' });
    }
  })());
});



