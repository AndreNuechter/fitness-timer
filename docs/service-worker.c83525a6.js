(function(){"use strict";const c=`fitness-timer-v${1670350843513}`;self.addEventListener("activate",t=>{t.waitUntil((async()=>{const e=await self.caches.keys();return Promise.all(e.map(s=>s.includes("fitness-timer")&&s!==c?self.caches.delete(s):!0))})())}),self.addEventListener("fetch",t=>{t.respondWith((async()=>{let e=await self.caches.match(t.request);return e||(e=await fetch(t.request),(await self.caches.open(c)).put(t.request,e.clone()),e)})())})})();