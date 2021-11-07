const OFFLINE_VERSION="c2bc9b6b-7836-45d7-9cc0-37c439612305",CACHE_NAME="darts-offline",OFFLINE_URL="/";self.addEventListener("install",(e=>{e.waitUntil((async()=>{const e=await caches.open(CACHE_NAME);await e.add(new Request("/",{cache:"reload"})),await e.add(new Request("/main.css",{cache:"reload"})),await e.add(new Request("/main.js",{cache:"reload"}))})()),self.skipWaiting()})),self.addEventListener("activate",(e=>{e.waitUntil((async()=>{"navigationPreload"in self.registration&&await self.registration.navigationPreload.enable()})()),self.clients.claim()})),self.addEventListener("fetch",(e=>{"navigate"===e.request.mode?e.respondWith((async()=>{try{const a=await e.preloadResponse;return a||await fetch(e.request)}catch(e){console.log("Fetch failed; returning offline page instead.",e);const a=await caches.open(CACHE_NAME);return await a.match("/")}})()):"style"===e.request.destination?e.respondWith((async()=>{try{return await fetch(e.request)}catch(e){const a=await caches.open(CACHE_NAME);return await a.match("/main.css")}})()):"script"===e.request.destination&&e.respondWith((async()=>{try{return await fetch(e.request)}catch(e){const a=await caches.open(CACHE_NAME);return await a.match("/main.js")}})())}));