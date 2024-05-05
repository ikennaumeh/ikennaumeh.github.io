'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e9f21cdee0fd34ebec583934afd6aff8",
"assets/AssetManifest.json": "0c15e02c4ca827c6a3da853c6ad4293d",
"assets/assets/images/bedpsace-owner.webp": "251a8c8672f2763e51710e4ef1e47a57",
"assets/assets/images/bedspace.webp": "e380daa02f11a114ab5eef36df2a1118",
"assets/assets/images/cloudfood-vendor.webp": "37a515d07908f28e3bd34f32df8750ca",
"assets/assets/images/cloudfood.webp": "033e8263b0ddf5861b2401d76b51dc80",
"assets/assets/images/code100.webp": "f30c695e70cb29673c4bedee6ab1eb09",
"assets/assets/images/d4u-rider.webp": "6b6d9850a797652359cc150f303d6e44",
"assets/assets/images/d4u.webp": "5da4b216e9665be22381ffe317392137",
"assets/assets/images/devcare.webp": "ddb63d1c02bd44f9ae44ebd97d8b1408",
"assets/assets/images/download.png": "37f58c8bcca7e285d1f881d4a7ad3d34",
"assets/assets/images/esan.webp": "dc15ef8cb85398ff8c0a31023848f97f",
"assets/assets/images/gtcn.webp": "b0326a94e7970ea9844d85ba70737c8d",
"assets/assets/images/kingcard.webp": "fb2cb0c206de5390c637010465edc3a7",
"assets/assets/images/one-bank.webp": "fc4f9f329eb8897129fddb4f959f1126",
"assets/assets/images/onehuman.jpeg": "0a83003000283c5e91a37f7374d9e4ba",
"assets/assets/images/onetoken.webp": "8e483f97cf2dfd6353cf4a034dfc81b3",
"assets/assets/images/reown-reporter.webp": "c58eba314eea69b23e231984dd0191ad",
"assets/assets/images/reown.webp": "be32e2bcb22ae6da020859d37f2d48fb",
"assets/assets/images/shop4me.webp": "fa26abae559d1eb4f0772c53dfc24bae",
"assets/assets/images/yougo-rider.webp": "9c75d56e2d0a587d150fb15f12f93734",
"assets/assets/images/yougo.webp": "18c6d8c64a8a12ec31674fb472a047f4",
"assets/assets/svg/github.svg": "2f55debd98b4040009b3ab545969577d",
"assets/assets/svg/linkedin.svg": "edfbbde4c7212943dc749d30b9f9f721",
"assets/assets/svg/twitter.svg": "92d5794ba6caab0c2095faa3d3c2dd8f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "cbaa60d994055e037c2bcd950b7cc851",
"assets/NOTICES": "4a28335430191682a4f34a41ecb98bf0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "2c38ed650842645b8bc893dee24f27c0",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/icon-192-maskable.png": "d6782f7a3fdfa893d45efe8a1354821e",
"icons/icon-192.png": "4112762e4071c2d4ee92de29e36f4a6c",
"icons/icon-512-maskable.png": "e9d3cffd903427956caa674d143ff489",
"icons/icon-512.png": "9de1134cdb7fefa58af27d158a3fd83d",
"index.html": "8bcfbe2f49b87c20079f6b43d866c96d",
"/": "8bcfbe2f49b87c20079f6b43d866c96d",
"main.dart.js": "5ac4ff51549376d552b033f53f145cbe",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
