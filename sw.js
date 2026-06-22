/* ClassTapMark service worker
   - Cache-first app shell for offline use
   - Stale-while-revalidate for CDN libraries (XLSX + pdf-lib)
   - Network-first (no-store) ONLY for the Free Rental switch file

   Notes:
   - Uses SW scope-aware ABS() so it works on GitHub Pages (/ClassTapMark/) and localhost.
   - Required precache list is kept small to avoid install failures.
   - Optional assets are added with best-effort (won't break install if missing).
*/

const CACHE_NAME = 'ClassTapMark-cache-v5-2026-06-22mn';
const DYNAMIC_CACHE = 'ctm-dynamic-v5-2026-06-22mn';

const CDN_XLSX = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const CDN_PDFLIB = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
const CDN_LZ = 'https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.4.4/lz-string.min.js';

// Build absolute URLs based on SW scope (works on GitHub Pages /ClassTapMark/ and localhost)
const SCOPE = self.registration.scope;
const ABS = (p) => new URL(p, SCOPE).toString();

// ===== Required app shell (keep minimal; failing here breaks install) =====
const REQUIRED_PRECACHE = [
  ABS('./'),
  ABS('./index.html'),
  ABS('./manifest.json'),
  ABS('./sw.js'),
];

// ===== Optional assets (best-effort; missing files won't break install) =====
const OPTIONAL_PRECACHE = [
  // Favicon (per your repo)
  ABS('./image/favicon-32.png'),

  // Donation/support QR images referenced by support.html
  ABS('./image/wise-qr.png'),
  ABS('./image/gcash-qr.png'),
  ABS('./image/maya-qr.jpg'),
  ABS('./image/maribank-qr.png'),

  // App icons (only cache what actually exists in your repo)
  ABS('./icon192x192.png'),
  ABS('./icon256x256.png'),
  ABS('./icon384x384.png'),
  ABS('./icon512x512.png'),

  // Optional pages
  ABS('./free-rental.html'),
  ABS('./support.html'),

  // Optional external script used by index.html
  ABS('./SF2.js'),
];

async function safeCacheAddAll(cache, urls) {
  const tasks = urls.map(async (u) => {
    try {
      const res = await fetch(u, { cache: 'no-store' });
      if (res && res.ok) await cache.put(u, res.clone());
    } catch (_) {
      // ignore
    }
  });
  await Promise.allSettled(tasks);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // 1) Required app shell (strict)
    await cache.addAll(REQUIRED_PRECACHE);

    // 2) Optional assets (best-effort; won't fail install)
    await safeCacheAddAll(cache, OPTIONAL_PRECACHE);

    // 3) Best-effort CDN libs so Import/Export can work offline after first install
    try { await cache.add(CDN_XLSX); } catch (_) {}
    try { await cache.add(CDN_PDFLIB); } catch (_) {}

    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => {
      if (k === CACHE_NAME || k === DYNAMIC_CACHE) return null;
      return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

// ===== Helpers =====
async function cacheFirst(req, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;

  const fresh = await fetch(req);
  // Only cache same-origin requests here to avoid opaque responses
  const url = new URL(req.url);
  if (url.origin === self.location.origin && fresh && fresh.ok) {
    cache.put(req, fresh.clone());
  }
  return fresh;
}

async function staleWhileRevalidate(req, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);

  const fetchPromise = (async () => {
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) cache.put(req, fresh.clone());
      return fresh;
    } catch (_) {
      return null;
    }
  })();

  return cached || (await fetchPromise) || new Response('', { status: 504 });
}

async function networkFirstNoStoreWithFallback(req, fallbackResponseText) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    if (fresh && fresh.ok) cache.put(req, fresh.clone());
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

  // 1) Free Rental switch file: NETWORK-FIRST + no-store + cached fallback
  if (url.pathname.endsWith('/rental-switch.js')) {
    // Fallback defines both variables, so rental stays OFF if switch can't load.
    const fallback =
      'window.CTM_FREE_RENTAL_ON=false;
' +
      'window.CTM_FREE_RENTAL={' +
      'email:'teacher1@example.com',' +
      'license:'CTM-0798A1AA',' +
      'signature:'3a92a7e61a9094ed2394c417e684b6724d6222df21e376855e605071a5977befb01f418929eeb3f318f2b3adedcc86a2df7b009c9bbf86db34ab18d0d43a9503'' +
      '};';

    event.respondWith(networkFirstNoStoreWithFallback(req, fallback));
    return;
  }

  // 2) CDN libs: STALE-WHILE-REVALIDATE
  if (req.url === CDN_XLSX || req.url === CDN_PDFLIB || req.url === CDN_LZ) {
    event.respondWith(staleWhileRevalidate(req, CACHE_NAME));
    return;
  }

  // 3) Navigations: NETWORK-FIRST, fallback to cached index.html when offline
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        // Cache the latest index.html for better offline reliability
        const cache = await caches.open(CACHE_NAME);
        if (fresh && fresh.ok) cache.put(ABS('./index.html'), fresh.clone());
        return fresh;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        const shell = await cache.match(ABS('./index.html'));
        return shell || new Response('Offline', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  // 4) Default: CACHE-FIRST (same-origin), then network
  //    Good for images under /image/ (including QR images) and other static assets.
  event.respondWith((async () => {
    try {
      return await cacheFirst(req, CACHE_NAME);
    } catch (_) {
      return new Response('', { status: 504 });
    }
  })());
});
