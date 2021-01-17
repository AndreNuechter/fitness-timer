/* eslint-disable no-restricted-globals */

const appName = 'fitness-timer';
const appVersion = '3';
const cacheName = `${appName}-v${appVersion}`;

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await self.caches.keys();
            keys.forEach((key) => {
                if (key.includes(appName) && key !== cacheName) {
                    self.caches.delete(key);
                }
            });
        })()
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            let response = await self.caches.match(event.request);
            if (response) return response;
            response = await fetch(event.request);
            const cache = await self.caches.open(cacheName);
            cache.put(event.request, response.clone());
            return response;
        })()
    );
});