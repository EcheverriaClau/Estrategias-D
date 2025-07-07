const CACHE_NAME = 'estrategias-ayla-v1';
const urlsToCache = [
  './',
  './index.html',
  './visual.css',
  './estrategiasBase.js',
  './estructurasBase.js',
  './visual-pro.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala y guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta solicitudes y devuelve desde caché o desde la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
