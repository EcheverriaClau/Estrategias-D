const CACHE_NAME = 'estrategias-ayla-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/visual.css',
  '/estrategiasBase.js',
  '/estructurasBase.js',
  '/visual-pro.js',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('estrategias-cache').then((cache) => {
      return cache.addAll([
        'index.html',
        'style.css',
        'script.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
