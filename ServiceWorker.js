const cacheName = "DefaultCompany-QR_WEB-1.0";
const contentToCache = [
    "Build/4a063b7ab2bb2d2e419aaacdd6d120f7.loader.js",
    "Build/33c2c0657a0c33a9a431c5d13f8f798e.framework.js.unityweb",
    "Build/b75a8902544f8e31ede95cf36e6794b3.data.unityweb",
    "Build/1b96a8f6013388e69a31610b9ecf8196.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
