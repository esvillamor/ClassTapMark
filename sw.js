/* ClassTapMark service worker - fixed offline shell
   - Pre-caches the real app shell files used by index.html
   - Keeps missing optional files from breaking install
   - Caches CDN libraries needed by XLSX/PDF/compression
   - Uses network-first only for rental-switch.js, with an offline fallback
*/

const CACHE_NAME = 'ClassTapMark-cache-v7-2026-07-11p';
const DYNAMIC_CACHE = 'ctm-dynamic-v7-2026-07-11p';

const CDN_XLSX = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const CDN_PDFLIB = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
const CDN_LZ = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js';

const SCOPE = self.registration.scope;
const ABS = (p) => new URL(p, SCOPE).toString();

// Keep this list very small and guaranteed to exist. If any item here 404s, SW install fails.
const REQUIRED_PRECACHE = [
  ABS('./'),
  ABS('./index.html')
];

// Best-effort list: missing files are ignored, so install does not fail.
const OPTIONAL_PRECACHE = [
  ABS('./manifest.json'),
  ABS('./image/favicon-32.png'),
  ABS('./icon192x192.png'),
  ABS('./icon256x256.png'),
  ABS('./icon384x384.png'),
  ABS('./icon512x512.png'),

  // Same-origin pages/assets used by ClassTapMark

  // Grade Sheet module shell (index.html loads gradesheet/gradesheet.js; it fetches gradesheet/gradesheet.html)
  ABS('./gradesheet/gradesheet.js'),
  ABS('./gradesheet/gradesheet.html'),
  ABS('./support.html'),
  ABS('./free-rental.html'),
  ABS('./SF1.js'),
  ABS('./SF2.js'),
  ABS('./SF3.js'),
  ABS('./SF8.js'),
  ABS('./SF1pdf.js'),
  ABS('./SF3pdf.js'),
  ABS('./SF8pdf.js'),
  ABS('./classrecord/classrecord-modal.js'),

  // Support QR images
  ABS('./image/wise-qr.png'),
  ABS('./image/gcash-qr.png'),
  ABS('./image/maya-qr.jpg'),
  ABS('./image/maribank-qr.png'),

  // CDN libraries used by index.html
  CDN_XLSX,
  CDN_PDFLIB,
  CDN_LZ
];

async function addAllRequired(cache, urls) {
  for (const url of urls) {
    const res = await fetch(url, { cache: 'reload' });
    if (!res || !res.ok) throw new Error('Required precache failed: ' + url);
    await cache.put(url, res.clone());
  }
}

async function addAllOptional(cache, urls) {
  await Promise.allSettled(urls.map(async (url) => {
    try {
      const res = await fetch(url, { cache: 'reload' });
      if (res && res.ok) await cache.put(url, res.clone());
    } catch (_) {}
  }));
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await addAllRequired(cache, REQUIRED_PRECACHE);
    await addAllOptional(cache, OPTIONAL_PRECACHE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => {
      if (key === CACHE_NAME || key === DYNAMIC_CACHE) return null;
      return caches.delete(key);
    }));
    await self.clients.claim();
  })());
});

async function cacheFirst(req, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;

  const fresh = await fetch(req);
  if (fresh && fresh.ok) {
    cache.put(req, fresh.clone()).catch(() => {});
  }
  return fresh;
}

async function staleWhileRevalidate(req, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);

  const refresh = fetch(req).then((fresh) => {
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  }).catch(() => null);

  return cached || (await refresh) || new Response('', { status: 504 });
}

async function networkFirstNoStoreWithFallback(req, fallbackResponseText) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  } catch (_) {
    const cached = await cache.match(req);
    return cached || new Response(fallbackResponseText, {
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' }
    });
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // The rental switch should remain network-first so you can turn rental access on/off online.
  if (url.pathname.endsWith('/rental-switch.js')) {
    const fallback =
      "window.CTM_FREE_RENTAL_ON=false;\n" +
      "window.CTM_FREE_RENTAL={" +
      "email:'teacher1@example.com'," +
      "license:'CTM-0798A1AA'," +
      "signature:'3a92a7e61a9094ed2394c417e684b6724d6222df21e376855e605071a5977befb01f418929eeb3f318f2b3adedcc86a2df7b009c9bbf86db34ab18d0d43a9503'" +
      "};\n";
    event.respondWith(networkFirstNoStoreWithFallback(req, fallback));
    return;
  }

  // CDN libraries: serve cached immediately, refresh when online.
  if (req.url === CDN_XLSX || req.url === CDN_PDFLIB || req.url === CDN_LZ) {
    event.respondWith(staleWhileRevalidate(req, CACHE_NAME));
    return;
  }


  // Grade Sheet module: show cached version offline, refresh when online.
  // This prevents stale Grade Sheet files after index.html changes while still supporting offline use.
  if (url.pathname.endsWith('/gradesheet/gradesheet.js') || url.pathname.endsWith('/gradesheet/gradesheet.html')) {
    event.respondWith(staleWhileRevalidate(req, CACHE_NAME));
    return;
  }

  // Special handling for support.html (NO index.html fallback!)
if (url.pathname.endsWith('/support.html')) {
  event.respondWith(cacheFirst(req, CACHE_NAME).catch(() =>
    new Response('Support page not available offline yet.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    })
  ));
  return;
}

// App navigations: get latest online, fallback to cached index.html offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(ABS('./index.html'), fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(ABS('./index.html'))) ||
               (await cache.match(ABS('./'))) ||
               new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }});
      }
    })());
    return;
  }

  // Everything else: cache-first. This covers local JS, icons, QR images, and same-origin static files.
  event.respondWith(cacheFirst(req, CACHE_NAME).catch(() => new Response('', { status: 504 })));
});
