'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "c42c47dcf96c126a311e41ad81be6bb7",
"assets/AssetManifest.bin.json": "7a82cf5a1e08c0237136d5f96bdf97e9",
"assets/AssetManifest.json": "843ff720f645be6ef2afb3df9c015ee3",
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
"assets/assets/images/specta.webp": "30f9e06f9bfdcb58082bbaba2692c4eb",
"assets/assets/images/yougo-rider.webp": "9c75d56e2d0a587d150fb15f12f93734",
"assets/assets/images/yougo.webp": "18c6d8c64a8a12ec31674fb472a047f4",
"assets/assets/svg/github.svg": "2f55debd98b4040009b3ab545969577d",
"assets/assets/svg/linkedin.svg": "edfbbde4c7212943dc749d30b9f9f721",
"assets/assets/svg/twitter.svg": "92d5794ba6caab0c2095faa3d3c2dd8f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "0d1ca653197ea650619165f3916261ed",
"assets/NOTICES": "ac131f8ea5fc21232979c5fb978e2c39",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "2c38ed650842645b8bc893dee24f27c0",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "790c8bdc39b27d0e8249aa3cb78e7e7d",
"icons/icon-192-maskable.png": "d6782f7a3fdfa893d45efe8a1354821e",
"icons/Icon-192.png": "4112762e4071c2d4ee92de29e36f4a6c",
"icons/icon-512-maskable.png": "e9d3cffd903427956caa674d143ff489",
"icons/Icon-512.png": "9de1134cdb7fefa58af27d158a3fd83d",
"index.html": "9feca20c6a1fd919fd275f29a9e51853",
"/": "9feca20c6a1fd919fd275f29a9e51853",
"main.dart.js": "98afe0e93e894bcb53ecac33ac4683b4",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
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
