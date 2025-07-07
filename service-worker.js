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

// INSTALACIÓN: guarda archivos en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVACIÓN: limpia cachés antiguos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // 🧹 Limpia versiones viejas
          }
        })
      );
    })
  );
});

// FETCH: sirve desde caché o red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
