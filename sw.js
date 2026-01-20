const CACHE_NAME = 'ClassTapMark-cache-v1';
const urlsToCache = [
  '/',
  /ClassTapMark/',
  '/ClassTapMark/index.html',
  '/ClassTapMark/manifest.json',
  '/ClassTapMark/sw.js',
  '/ClassTapMark/favicon-32.png',  
  '/ClassTapMark/icon192x192.png',
  '/ClassTapMark/icon256x256.png',
  '/ClassTapMark/icon384x384.png',
  '/ClassTapMark/icon512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/index.html'))
  );
});


