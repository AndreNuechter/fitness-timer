(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const j=""+new URL("service-worker.js",import.meta.url).href;window.navigator.serviceWorker.register(j).catch(console.error);const S=(()=>{let e;async function t(){var s,n;e=await((n=(s=navigator.wakeLock)==null?void 0:s.request)==null?void 0:n.call(s,"screen"))}async function r(){!e||(await e.release(),e=void 0)}return{request:t,release:r}})(),k=new window.AudioContext,E=k.createGain();E.connect(k.destination);const g=(e,{volume:t=.25,duration:r=200}={volume:.25,duration:200})=>{const s=k.createOscillator();E.gain.value=t,s.connect(E),s.type="sine",s.frequency.value=e,s.start(),setTimeout(()=>s.stop(),r)},y={countdown:2e3,set:1500,break:1e3,finish:1750},b=document.getElementById("app"),T=document.getElementById("set-display"),w=document.getElementById("main-display"),H=w.previousElementSibling,N=document.getElementById("sub-display"),K=N.previousElementSibling,I=document.getElementById("state-toggle"),D=document.getElementById("reset-button"),v=document.getElementById("duration-visualization").lastElementChild;function O(e){L(w,e)}function A(e){$(H,e)}function x(e){L(N,e)}function F(e){$(K,e)}function M(e){I.firstElementChild.setAttribute("href",`#${e}`)}function B(e){L(T,e)}function $(e,t){e.textContent=t}function L(e,t){e.value=t}const l=JSON.parse(localStorage.getItem("fitness-timer-settings"))||{durations:[90,15],numberOfSets:6},P=()=>localStorage.setItem("fitness-timer-settings",JSON.stringify(l)),u={get durations(){return l.durations},setDuration(e,t){l.durations[e]=t,P()},get numberOfSets(){return l.numberOfSets},set numberOfSets(e){l.numberOfSets=e,P()}},p=["Hussle","Chill"],U=["play","pause"],V=/^\d+$/;let c,i,f,a,d,q,C,W;window.addEventListener("DOMContentLoaded",()=>{Q(),m()},{once:!0});b.addEventListener("focusin",({target:e})=>{!c&&e.tagName==="INPUT"&&e.select()});T.addEventListener("change",({target:{value:e}})=>{V.test(e)?(u.numberOfSets=Number(e),m()):B(u.numberOfSets)});w.addEventListener("change",({target:e})=>{G(Number(i),e)});N.addEventListener("change",({target:e})=>{G(Number(!i),e)});I.addEventListener("click",X);D.addEventListener("click",m);function Q(){const e=v.getTotalLength(),t=e*.01;C=r=>{v.style.strokeDashoffset=`-${t*(100-r)}`},z(),v.style.strokeDasharray=e}function m(){d=void 0,c=!1,i=!1,f=u.numberOfSets,[a]=u.durations,R(),C(100),B(f),O(a),A(p[0]),x(u.durations[1]),F(p[1]),M(U[0]),I.addEventListener("click",Y,{once:!0}),b.classList.remove("timer-is-running"),S.release(),D.classList.add("hidden")}function z(){W=u.durations.map(e=>e*.01)}function X(){c=!c,M(U[Number(c)]),c?(q=requestAnimationFrame(J),b.classList.add("timer-is-running"),S.request()):(R(),b.classList.remove("timer-is-running"),S.release())}function G(e,t){const{value:r}=t;V.test(r)?(u.setDuration(e,Number(r)),z(),m()):L(t,u.durations[e])}function Y(){g(y.set,{duration:600}),D.classList.remove("hidden")}function J(e){d===void 0&&(d=e),q=requestAnimationFrame(J),e-d>=1e3&&(d=e,Z())}function Z(){a-=1;const e=a<0;if(O(a),C(e?100:a/W[Number(i)]),e){if(i=!i,i||(f-=1),!f){g(y.finish,{duration:700}),m();return}a=u.durations[Number(i)],g(y[i?"break":"set"]),B(f),O(a),x(u.durations[Number(!i)]),A(p[Number(i)]),F(p[Number(!i)])}else a<10&&g(y.countdown+20*(10-a))}function R(){cancelAnimationFrame(q)}
