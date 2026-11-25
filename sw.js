const V='hb-d7d6c42d2f',NETS='hb-nets-1';
const SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=V&&k!=NETS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||new URL(r.url).origin!=location.origin)return;
 const net=/\/(maia1|leela)\//.test(r.url);
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(net?NETS:V).then(k=>k.put(r,c))}return res})))});
