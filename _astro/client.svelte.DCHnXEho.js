import{p as u}from"./proxy.B5YaBVWG.js";import{a5 as m,a6 as y,a7 as h,a8 as _,v as $,Y as v,Q as b,a9 as g,aa as x,ab as k}from"./render.DJ_A4ybr.js";function f(t){return(s,...e)=>{var r,o=t(...e);if($)r=v,b();else{var a=o.render().trim(),n=m(a);r=_(n),s.before(r)}const f=o.setup?.(r);y(r,r),"function"==typeof f&&h(f)}}const p=new WeakMap,O=t=>async(s,e,r,{client:o})=>{if(!t.hasAttribute("ssr"))return;let a,n,l={};for(const[t,s]of Object.entries(r))n??={},"default"===t?(n.default=!0,a=f((()=>({render:()=>`<astro-slot>${s}</astro-slot>`})))):n[t]=f((()=>({render:()=>`<astro-slot name="${t}">${s}</astro-slot>`}))),"default"===t?l.children=f((()=>({render:()=>`<astro-slot>${s}</astro-slot>`}))):l[t]=f((()=>({render:()=>`<astro-slot name="${t}">${s}</astro-slot>`})));const i={...e,children:a,$$slots:n,...l};if(p.has(t))p.get(t).setProps(i);else{const e=j(s,t,i,"only"!==o);p.set(t,e),t.addEventListener("astro:unmount",(()=>e.destroy()),{once:!0})}};function j(t,s,e,r){let o=u(e);const a=(r?x:k)(t,{target:s,props:o});return{setProps(t){Object.assign(o,t);for(const s in o)s in t||delete o[s]},destroy(){g(a)}}}export{O as default};