const CACHE_NAME='matma-v6b';
const URLS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','https://fonts.googleapis.com/css2?family=Righteous&family=Nunito:wght@400;600;700;800&display=swap'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.allSettled(URLS.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>{if(c)return c;return fetch(e.request).then(r=>{if(!r||r.status!==200||r.type==='error')return r;const cl=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cl));return r;}).catch(()=>caches.match('./index.html'));}));});
