import{o as le,a as ne,I as H,h as se,r as O,s as P,i as ie}from"./Icon.DBQ5HSHR.js";import{F as oe,g as v,I as D,G as $,H as z,J as ce,K as j,B as V,L as fe,v as S,M as ue,N as de,O as ve,P as he,Q as pe,R as me,T as ge,V as F,W as K,X as Y,Y as N,Z as _e,_ as be,y as W,$ as xe,a0 as ke,a1 as we,a2 as ye,a3 as Ee,E as Ie,p as Te,l as X,k as Ae,a4 as Me,t as q,e as G,a as J,b as Re,c as ee,f as B,h as I,i as T,m as C,r as A,j as Se}from"./render.DJ_A4ybr.js";import{b as Q}from"./input.C8KiteHp.js";import{u as U}from"./url-utils._fwOey0m.js";import{I as Le}from"./zh_TW.Bj_LEvYH.js";function Ne(e,a){return a}function He(e,a,t,s){for(var l=[],n=a.length,r=0;r<n;r++)ue(a[r].e,l,!0);var i=n>0&&0===l.length&&null!==t;if(i){var o=t.parentNode;de(o),o.append(t),s.clear(),E(e,a[0].prev,a[n-1].next)}ve(l,(()=>{for(var t=0;t<n;t++){var l=a[t];i||(s.delete(l.k),E(e,l.prev,l.next)),he(l.e,!i)}}))}function Be(e,a,t,s,l,n=null){var r=e,i={flags:a,items:new Map,first:null};S&&pe();var o=null,c=!1,u=me((()=>{var e=t();return Ie(e)?e:null==e?[]:j(e)}));oe((()=>{var e=v(u),t=e.length;if(c&&0===t)return;c=0===t;let d=!1;S&&(r.data===ge!==(0===t)&&(r=F(),K(r),Y(!1),d=!0));if(S){for(var f,h=null,p=0;p<t;p++){if(8===N.nodeType&&N.data===ke){r=N,d=!0,Y(!1);break}var b=e[p],g=s(b,p);f=ae(N,i,h,null,b,g,p,l,a),i.items.set(g,f),h=f}t>0&&K(F())}S||Ce(e,i,r,l,a,!!(_e.f&D),s);null!==n&&(0===t?o?$(o):o=z((()=>n(r))):null!==o&&ce(o,(()=>{o=null}))),d&&Y(!0),v(u)})),S&&(r=N)}function Ce(e,a,t,s,l,n,r,i){var o,v,c,u,d,f=e.length,h=a.items,p=a.first,b=null,g=[],m=[];for(d=0;d<f;d+=1)if(c=r(v=e[d],d),void 0!==(u=h.get(c))){if(De(u,v,d),u.e.f&D&&$(u.e),u!==p){if(void 0!==o&&o.has(u)){if(g.length<m.length){var x,k=m[0];b=k.prev;var w=g[0],y=g[g.length-1];for(x=0;x<g.length;x+=1)Z(g[x],k,t);for(x=0;x<m.length;x+=1)o.delete(m[x]);E(a,w.prev,y.next),E(a,b,w),E(a,y,k),p=k,b=y,d-=1,g=[],m=[]}else o.delete(u),Z(u,p,t),E(a,u.prev,u.next),E(a,u,null===b?a.first:b.next),E(a,b,u),b=u;continue}for(g=[],m=[];null!==p&&p.k!==c;)(n||!(p.e.f&D))&&(o??=new Set).add(p),m.push(p),p=p.next;if(null===p)continue;u=p}g.push(u),b=u,p=u.next}else{b=ae(p?p.e.nodes_start:t,a,b,null===b?a.first:b.next,v,c,d,s,l),h.set(c,b),g=[],m=[],p=b.next}if(null!==p||void 0!==o){for(var I=void 0===o?[]:j(o);null!==p;)(n||!(p.e.f&D))&&I.push(p),p=p.next;if(I.length>0){He(a,I,null,h)}}V.first=a.first&&a.first.e,V.last=b&&b.e}function De(e,a,t,s){fe(e.v,a),e.i=t}function ae(e,a,t,s,l,n,r,i,o,v){var c=!!(o&we)?!(o&ye)?be(l):W(l):l,u=o&xe?W(r):r,d={i:u,v:c,k:n,a:null,e:null,prev:t,next:s};try{return d.e=z((()=>i(e,c,u)),S),d.e.prev=t&&t.e,d.e.next=s&&s.e,null===t?a.first=d:(t.next=d,t.e.next=d.e),null!==s&&(s.prev=d,s.e.prev=d.e),d}finally{}}function Z(e,a,t){for(var s=e.next?e.next.e.nodes_start:t,l=a?a.e.nodes_start:t,n=e.e.nodes_start;n!==s;){var r=Ee(n);l.before(n),n=r}}function E(e,a,t){null===a?e.first=t:(a.next=t,a.e.next=t&&t.e),null!==t&&(t.prev=a,t.e.prev=a&&a.e)}var Ye=ee('<a class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block\n       rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"><div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]"> <!></div> <div class="transition text-sm text-50"><!></div></a>'),Oe=ee('<div id="search-bar" class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg\n      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]\n      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10\n"><!> <input class="transition-all pl-10 text-sm bg-transparent outline-0\n         h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50 svelte-1gu5h8y"></div> <button aria-label="Search Panel" id="search-switch" class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90"><!></button> <div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-[30rem]\ntop-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"><div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl\n      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]\n      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10\n  "><!> <input placeholder="Search" class="pl-10 absolute inset-0 text-sm bg-transparent outline-0\n               focus:w-60 text-black/50 dark:text-white/50 svelte-1gu5h8y"></div> <!></div>',1);function qe(e,a){Te(a,!1);let t=C(""),s=C(""),l=C([]);U("/"),U("/");let n=C(((e,a)=>{}));le((()=>{B(n,(async(e,a)=>{let t=document.getElementById("search-panel");if(!t)return;if(!e&&a)return void t.classList.add("float-panel-closed");let s=[];{const a=await pagefind.search(e);for(const e of a.results)s.push(await e.data())}s.length||!a?(a&&t.classList.remove("float-panel-closed"),B(l,s)):t.classList.add("float-panel-closed")}))}));X((()=>(v(n),v(t))),(()=>{v(n)(v(t),!0)})),X((()=>(v(n),v(s))),(()=>{v(n)(v(s),!1)})),Ae(),ne();var r=Oe(),i=Me(r),o=I(i);H(o,{icon:"material-symbols:search",class:"absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"});var c=T(o,2);O(c),q((()=>P(c,"placeholder",ie(Le.search)))),A(i);var u=T(i,2),d=I(u);H(d,{icon:"material-symbols:search",class:"text-[1.25rem]"}),A(u);var f=T(u,2),h=I(f),p=I(h);H(p,{icon:"material-symbols:search",class:"absolute text-[1.25rem] pointer-events-none ml-3 transition my-auto text-black/30 dark:text-white/30"});var b=T(p,2);O(b),A(h),Be(T(h,2),1,(()=>v(l)),Ne,((e,a)=>{var t=Ye(),s=I(t),l=I(s,!0),n=T(l);H(n,{icon:"fa6-solid:chevron-right",class:"transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"}),A(s);var r=T(s,2),i=I(r);se(i,(()=>v(a).excerpt),!1,!1),A(r),A(t),q((()=>{P(t,"href",v(a).url),Se(l,v(a).meta.title)})),J(e,t)})),A(f),Q(c,(()=>v(t)),(e=>B(t,e))),G("focus",c,(()=>v(n)(v(t),!0))),G("click",u,(()=>{document.getElementById("search-panel")?.classList.toggle("float-panel-closed")})),Q(b,(()=>v(s)),(e=>B(s,e))),J(e,r),Re()}export{qe as default};