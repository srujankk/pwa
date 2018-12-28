importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");


workbox.routing.registerRoute(
  new RegExp('http://rest.learncode.academy/api/srujan3/todos'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404]
      })
    ]
  })
);

workbox.precaching.precacheAndRoute([]);
