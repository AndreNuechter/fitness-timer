!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(2)},,function(e,t,n){"use strict";n.r(t);(async()=>{if(!("WakeLock"in window)||!("request"in window.WakeLock))return;const e=()=>navigator.wakeLock.request("screen");await e(),document.addEventListener("visibilitychange",async()=>{"visible"===document.visibilityState&&await e()})})();const i=new window.AudioContext,o=i.createGain();o.gain.value=.25,o.connect(i.destination);var r=(e,t=200)=>{const n=i.createOscillator();n.connect(o),n.type="sine",n.frequency.value=e,n.start(),setTimeout(()=>n.stop(),t)};const s={countdown:2500,set:220,break:1e3,finish:1500},a=document.getElementById("app"),u=document.getElementById("set-display"),c=document.getElementById("main-display"),d=c.previousElementSibling,l=document.getElementById("sub-display"),f=l.previousElementSibling,m=document.getElementById("state-toggle"),v=document.getElementById("reset-button"),g=document.getElementById("duration-visualization").lastElementChild;function y(e){O(c,e)}function p(e){L(d,e)}function b(e){O(l,e)}function E(e){L(f,e)}function S(e){m.firstElementChild.setAttribute("href","#"+e)}function w(e){O(u,e)}function L(e,t){e.textContent=t}function O(e,t){e.value=t}var h=new Proxy(JSON.parse(localStorage.getItem("fitness-timer-settings"))||{durations:[90,15],numberOfSets:6},{set:(e,t,n)=>t in e&&(Reflect.set(e,t,n),localStorage.setItem("fitness-timer-settings",JSON.stringify(e)),!0)});const I=["Hussle","Chill"],k=["play","pause"],x="click",j="change",B="DOMContentLoaded",P="focusin",C=/^\d+$/;let _,M,T,N,q,D,A;function J(){M=!1,T=!1,_=h.numberOfSets,[N]=h.durations,U(),D(100),w(_),y(N),p(I[0]),b(h.durations[1]),E(I[1]),S(k[0]),m.addEventListener(x,H,{once:!0}),v.classList.add("hidden")}function W(){A=h.durations.map(e=>.01*e)}function z(){M=!M,S(k[+M]),M?q=setInterval(R,1e3):U()}function G(e,t){const{value:n}=t;C.test(n)?(h.durations[e]=+n,h.durations=h.durations,W(),J()):O(t,h.durations[e])}function H(){r(s.startSet,500),v.classList.remove("hidden")}function R(){N-=1;const e=N<0;if(y(N),D(e?100:N/A[+T]),e){if(T=!T,T||(_-=1),!_)return r(s.finish,500),void J();N=h.durations[+T],r(s[T?"break":"set"]),w(_),y(N),b(h.durations[+!T]),p(I[+T]),E(I[+!T])}else N<10&&r(s.countdown)}function U(){clearInterval(q)}window.addEventListener(B,()=>{!function(){const e=g.getTotalLength(),t=.01*e;D=e=>{g.style.strokeDashoffset="-"+t*(100-e)},W(),g.style.strokeDasharray=e}(),J()},{once:!0}),a.addEventListener(P,({target:e})=>{"INPUT"===e.tagName&&(M&&z(),e.select())}),u.addEventListener(j,({target:e})=>{const{value:t}=e;C.test(t)?(h.numberOfSets=+t,J()):w(h.numberOfSets)}),c.addEventListener(j,({target:e})=>{G(T?1:0,e)}),l.addEventListener(j,({target:e})=>{G(T?0:1,e)}),m.addEventListener(x,z),v.addEventListener(x,J)}]);