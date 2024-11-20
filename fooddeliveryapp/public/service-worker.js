// public/service-worker.js

const CACHE_NAME = 'vite-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  // Add any other assets to be cached
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Files');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Fetch from Cache or Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available, else fetch from the network
      return cachedResponse || fetch(event.request).then((response) => {
        // Clone the response and cache it for future use
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      });
    })
  );
});

// Activate Service Worker and Clean Old Cache
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Service Worker: Deleting Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
