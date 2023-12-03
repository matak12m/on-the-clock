const cacheName = 'On-the-Clock';
const filesToCache = [
  '.',
  'index.html',
  'browserGameplay.html',
  'mobileGameplay.html',
  'assets/css/gameplay.css',
  'assets/css/screen.css',
  'assets/js/clock.js',
  'assets/js/form.js',
  'assets/js/script.js',
  'assets/js/scriptMoile.js',
  'assets/js/setup.js',
  'assets/js/textbox.js',

  './Matt_Martinek_C00288248-UI-Programming-Module-Project/',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/index.html',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/browserGameplay.html',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/mobileGameplay.html',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/css/gameplay.css',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/css/screen.css',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/clock.js',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/form.js',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/script.js',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/scriptMoile.js',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/setup.js',
  './Matt_Martinek_C00288248-UI-Programming-Module-Project/assets/js/textbox.js',



];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(filesToCache);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req.url);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}