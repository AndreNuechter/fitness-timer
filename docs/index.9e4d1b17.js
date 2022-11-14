(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();(async()=>{if(!("wakeLock"in navigator&&"request"in navigator.wakeLock))return;const e=()=>navigator.wakeLock.request("screen");await e(),document.addEventListener("visibilitychange",async()=>{document.visibilityState==="visible"&&await e()})})();const J=""+new URL("service-worker.ab9f68ee.js",import.meta.url).href;window.addEventListener("DOMContentLoaded",()=>{"serviceWorker"in window.navigator&&window.navigator.serviceWorker.register(J)},{once:!0});const w=new window.AudioContext,L=w.createGain();L.connect(w.destination);const m=(e,t=.25,a=200)=>{const c=w.createOscillator();L.gain.value=t,c.connect(L),c.type="sine",c.frequency.value=e,c.start(),setTimeout(()=>c.stop(),a)},g={countdown:2500,set:1500,break:1e3,finish:1750},j=document.getElementById("app"),B=document.getElementById("set-display"),E=document.getElementById("main-display"),F=E.previousElementSibling,S=document.getElementById("sub-display"),H=S.previousElementSibling,k=document.getElementById("state-toggle"),O=document.getElementById("reset-button"),v=document.getElementById("duration-visualization").lastElementChild;function h(e){b(E,e)}function C(e){x(F,e)}function P(e){b(S,e)}function T(e){x(H,e)}function q(e){k.firstElementChild.setAttribute("href",`#${e}`)}function I(e){b(B,e)}function x(e,t){e.textContent=t}function b(e,t){e.value=t}const l=JSON.parse(localStorage.getItem("fitness-timer-settings"))||{durations:[90,15],numberOfSets:6},N=()=>localStorage.setItem("fitness-timer-settings",JSON.stringify(l)),r={get durations(){return l.durations},setDuration(e,t){l.durations[e]=t,N()},get numberOfSets(){return l.numberOfSets},set numberOfSets(e){l.numberOfSets=e,N()}},y=["Hussle","Chill"],M=["play","pause"],W=/^\d+$/;let d,u,s,o,$,D,A;window.addEventListener("DOMContentLoaded",()=>{K(),f()},{once:!0});j.addEventListener("focusin",({target:e})=>{e.tagName==="INPUT"&&(u&&V(),e.select())});B.addEventListener("change",({target:{value:e}})=>{W.test(e)?(r.numberOfSets=+e,f()):I(r.numberOfSets)});E.addEventListener("change",({target:e})=>{z(Number(s),e)});S.addEventListener("change",({target:e})=>{z(Number(!s),e)});k.addEventListener("click",V);O.addEventListener("click",f);function K(){const e=v.getTotalLength(),t=e*.01;D=a=>{v.style.strokeDashoffset=`-${t*(100-a)}`},U(),v.style.strokeDasharray=e}function f(){u=!1,s=!1,d=r.numberOfSets,[o]=r.durations,G(),D(100),I(d),h(o),C(y[0]),P(r.durations[1]),T(y[1]),q(M[0]),k.addEventListener("click",R,{once:!0}),O.classList.add("hidden")}function U(){A=r.durations.map(e=>e*.01)}function V(){u=!u,q(M[Number(u)]),u?Q():G()}function z(e,t){const{value:a}=t;W.test(a)?(r.setDuration(e,+a),U(),f()):b(t,r.durations[e])}function R(){m(g.set,void 0,600),O.classList.remove("hidden")}function Q(){$=setInterval(X,1e3)}function X(){o-=1;const e=o<=0;if(h(o),D(e?100:o/A[Number(s)]),e){if(s=!s,s||(d-=1),!d){m(g.finish,void 0,700),f();return}o=r.durations[Number(s)],m(g[s?"break":"set"]),I(d),h(o),P(r.durations[Number(!s)]),C(y[Number(s)]),T(y[Number(!s)])}else o<10&&m(g.countdown,.25+(10-o)*1.3)}function G(){clearInterval($)}
