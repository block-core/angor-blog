const __vite__mapDeps=(e,t=__vite__mapDeps,n=t.f||(t.f=["_astro/SwupA11yPlugin.BgrswG5B.js","_astro/Swup.zxKn2eCt.js","_astro/index.modern.T7m-bNQW.js","_astro/SwupPreloadPlugin.BfRNriqP.js","_astro/SwupScrollPlugin.SShcYMfS.js","_astro/SwupHeadPlugin.BCEBzQkC.js","_astro/SwupScriptsPlugin.ByWDerri.js"]))=>e.map((e=>n[e]));import{_ as i}from"./preload-helper.CLcXU_4U.js";function o(e){return JSON.parse(e,_)}function _(e,t){if(Array.isArray(t)&&2===t.length&&"string"==typeof t[1]){const e=t[0];if(t=t[1],":regex:"===e){const e=t.match(/\/(.*?)\/([a-z]*)?$/i)||[];return new RegExp(e[1],e[2]||"")}if(":function:"===e)return new Function(`return (${t}).apply(this, arguments);`)}return t}function a(e,{timeoutFallback:t=1e3}={}){"requestIdleCallback"in window?window.requestIdleCallback((()=>e())):setTimeout((()=>e()),t)}function f(e){"complete"===document.readyState?setTimeout((()=>e()),0):window.addEventListener("load",(()=>e()))}function c(e,{delayAfterLoad:t=0}={}){f((()=>{t>0?setTimeout((()=>a(e)),t):a(e)}))}async function l(){const[e,t,n,a,s,r]=await Promise.all([i((()=>import("./Swup.zxKn2eCt.js").then((e=>e.S))),[]).then((e=>e.default)),i((()=>import("./SwupA11yPlugin.BgrswG5B.js")),__vite__mapDeps([0,1,2])).then((e=>e.default)),i((()=>import("./SwupPreloadPlugin.BfRNriqP.js")),__vite__mapDeps([3,2,1])).then((e=>e.default)),i((()=>import("./SwupScrollPlugin.SShcYMfS.js")),__vite__mapDeps([4,2,1])).then((e=>e.default)),i((()=>import("./SwupHeadPlugin.BCEBzQkC.js")),__vite__mapDeps([5,2])).then((e=>e.default)),i((()=>import("./SwupScriptsPlugin.ByWDerri.js")),__vite__mapDeps([6,2])).then((e=>e.default))]),p=new e({animationSelector:'[class*="transition-swup-"]',containers:["main","#toc"],cache:!0,plugins:[new t(o("{}")),new n(o('{"preloadHoveredLinks":true,"preloadVisibleLinks":false}')),new a(o("{}")),new s(o('{"awaitAssets":true}')),new r(o("{}"))]}),u=e=>document.dispatchEvent(new Event(e));p.hooks.before("content:replace",(()=>u("astro:before-swap"))),p.hooks.on("content:replace",(()=>u("astro:after-swap"))),p.hooks.on("page:view",(()=>u("astro:page-load"))),window.swup=p}c(l);