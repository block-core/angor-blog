import{a as f,n as k}from"./nostr.DwV-zqXQ.js";class T{MEDIA_EXTENSIONS={image:[".jpg",".jpeg",".gif",".png",".webp",".apng",".jfif",".svg"],video:[".mp4",".m4v",".m4p",".mpg",".mpeg",".webm",".avif",".mov",".ogv"],audio:[".mp3",".m4a",".flac",".ogg",".wav"]};MEDIA_PLATFORMS={YOUTUBE:["youtu.be","youtube.com"],SPOTIFY:["open.spotify.com"],TIDAL:["tidal.com"]};parseContent(e){const t=this.sanitizeText(e),s=this.processMarkdownImages(t),a=this.tokenizeText(s);return this.combinePlainText(a.map(n=>this.processToken(n)))}sanitizeText(e){return e.replaceAll(/\p{Cf}/gu,"")}processMarkdownImages(e){return e.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(t,s,a)=>{const n=this.cleanImageUrl(a);return this.isValidImageUrl(n)?`MARKDOWN_IMAGE:${n}`:t})}cleanImageUrl(e){return e.trim().replace(/^\(+/,"").replace(/\)+$/,"").replace(/\s+/g,"%20")}isValidImageUrl(e){const t=[".jpg",".jpeg",".gif",".png",".webp",".apng",".jfif",".svg"],s=e.toLowerCase();return t.some(a=>s.includes(a))||e.startsWith("data:image/")||e.includes("image.nostr.build")||e.includes("cdn.")||e.includes("imgur.com")}tokenizeText(e){return e.split(/(\s+|nostr:[a-zA-Z0-9]+|https?:\/\/[^\s]+|MARKDOWN_IMAGE:[^\s]+)/).filter(Boolean)}isMediaType(e,t){return t.some(s=>e.toLowerCase().includes(s))}isMediaPlatform(e,t){return t.some(s=>e.includes(s))}processToken(e){if(e.startsWith("MARKDOWN_IMAGE:")){const t=e.substring(15);return this.createMediaToken(t,"image")}return e.startsWith("nostr:")?this.processNostrToken(e):e.startsWith("@npub")||e.startsWith("@note")?this.processUsernameToken(e):this.isUrl(e)?this.processLinkToken(e):e}isUrl(e){return e.startsWith("http://")||e.startsWith("https://")}combinePlainText(e){const t=[];let s="";return e.forEach(a=>{typeof a=="string"?s+=a:(s&&(t.push(s),s=""),t.push(a))}),s&&t.push(s),t}processNostrToken(e){try{const t=e.substring(6),s=f.decode(t);return{safeWord:e,word:s.data,token:s.type}}catch(t){return console.warn("Failed to decode nostr token:",t),{word:e,token:"text"}}}processUsernameToken(e){try{const t=e.substring(1);if(t.startsWith("npub")||t.startsWith("note")){const s=f.decode(t);return{safeWord:e,word:s.data,token:s.type}}}catch(t){console.warn("Failed to decode username token:",t)}return e}processLinkToken(e){return this.isMediaType(e,this.MEDIA_EXTENSIONS.image)?this.createMediaToken(e,"image"):this.isMediaType(e,this.MEDIA_EXTENSIONS.video)?this.createMediaToken(e,"video"):this.isMediaType(e,this.MEDIA_EXTENSIONS.audio)?this.createMediaToken(e,"audio"):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.YOUTUBE)?this.processYouTubeLink(e):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.SPOTIFY)?this.processSpotifyLink(e):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.TIDAL)?this.processTidalLink(e):{word:e,token:"link"}}createMediaToken(e,t){return{safeWord:e,word:e,token:t}}processYouTubeLink(e){const t=this.extractYouTubeId(e);return{safeWord:`https://www.youtube.com/embed/${t}`,word:e,token:"youtube",embedId:t}}processSpotifyLink(e){return{safeWord:e.replace("open.spotify.com/","open.spotify.com/embed/"),word:e,token:"spotify"}}processTidalLink(e){return{safeWord:e.replace("tidal.com/browse/track/","embed.tidal.com/tracks/"),word:e,token:"tidal"}}extractYouTubeId(e){return e.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\n?#]+)/)?.[1]??""}}const v=new T;function A(r){return v.parseContent(r)}function M(r){const e=/!\[([^\]]*)\]\(([^)]+)\)/,t=r.match(e);if(t&&t[2]){const n=t[2].trim().replace(/^\(+/,"").replace(/\)+$/,"").replace(/\s+/g,"%20"),l=[".jpg",".jpeg",".gif",".png",".webp",".apng",".jfif",".svg"],o=n.toLowerCase();if(l.some(u=>o.includes(u))||n.startsWith("data:image/")||n.includes("image.nostr.build")||n.includes("cdn.")||n.includes("imgur.com"))return n}return v.parseContent(r).find(n=>typeof n=="object"&&n.token==="image")?.safeWord||null}const E="npub1wrzguj625auyeysfuuxzf7ywhzlwfz9gm3fml2lul72gwqxw8n9swtcm02",$=document.querySelector("#nostr-articles-container")?.getAttribute("data-nostr-gif")||"/src/images/nostr.gif",h=document.getElementById("loading-state"),x=document.getElementById("error-state"),b=document.getElementById("no-articles-state"),y=document.getElementById("articles-grid"),p=document.getElementById("articles-container"),w=document.getElementById("error-message"),L=document.getElementById("retry-button");function c(r){switch(h?.classList.add("hidden"),x?.classList.add("hidden"),b?.classList.add("hidden"),y?.classList.add("hidden"),r){case"loading":h?.classList.remove("hidden");break;case"error":x?.classList.remove("hidden");break;case"no-articles":b?.classList.remove("hidden");break;case"articles":y?.classList.remove("hidden");break}}function N(r){return r.map(e=>{if(typeof e=="string")return e;switch(e.token){case"image":return`<img src="${e.safeWord}" alt="Content image" class="max-w-full h-auto rounded-lg my-4" loading="lazy" onerror="this.style.display='none'" />`;case"video":return`<video controls class="max-w-full h-auto rounded-lg my-4"><source src="${e.safeWord}" /></video>`;case"youtube":return`<iframe src="${e.safeWord}" class="w-full aspect-video rounded-lg my-4" frameborder="0" allowfullscreen></iframe>`;case"spotify":return`<iframe src="${e.safeWord}" width="100%" height="352" frameborder="0" class="rounded-lg my-4"></iframe>`;case"link":return`<a href="${e.word}" target="_blank" rel="noopener noreferrer" class="text-[#086c81] hover:underline">${e.word}</a>`;case"npub":return`<span class="text-[#086c81] font-mono text-sm">@${e.word.slice(0,16)}...</span>`;default:return e.word}}).join("")}function S(r){p&&(p.innerHTML="",r.forEach(e=>{console.log("Rendering article:",e);const t=M(e.content)||e.image,s=e.summary||e.content.slice(0,300)+"...",a=Math.ceil(e.content.length/1e3),n=A(s),l=N(n);console.log("Article data:",{author:e.author,authorProfile:e.authorProfile,tags:e.tags,relays:e.relays,eventId:e.eventId});const o=e.authorProfile?.display_name||e.authorProfile?.name||e.author||"Anonymous",d=e.authorProfile?.picture,u=Array.isArray(e.tags)?e.tags:[],i=Array.isArray(e.relays)?e.relays:[];console.log("Processed metadata:",{authorName:o,authorPicture:d,articleTags:u,articleRelays:i});const m=document.createElement("article");m.className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300",m.innerHTML=`
        ${t?`
          <div class="aspect-video overflow-hidden">
            <img 
              src="${t}" 
              alt="${e.title}" 
              class="w-full h-full object-cover"
              loading="lazy"
              onerror="this.parentElement.style.display='none'"
            />
          </div>
        `:""}
        
        <div class="p-8">
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#086c81]/10 text-[#086c81] dark:bg-[#cbdde1]/10 dark:text-[#cbdde1]">
              Nostr Article
            </span>
            <time class="text-sm text-neutral-500 dark:text-neutral-400">
              ${new Date(e.publishedAt*1e3).toLocaleDateString()}
            </time>
          </div>
          
          <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4 group-hover:text-[#086c81] dark:group-hover:text-[#cbdde1] transition-colors duration-200 truncate whitespace-nowrap overflow-hidden">
            ${e.title}
          </h3>

          
          <div class="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-4">
            ${l}
          </div>
          
          <!-- Article metadata -->
          <div class="space-y-4">
            <!-- Author and read time -->
            <div class="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <div class="flex items-center gap-3">
                ${d?`
                  <img 
                    src="${d}" 
                    alt="${o}" 
                    class="w-8 h-8 rounded-full"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                  />
                  <div class="w-8 h-8 rounded-full bg-[#086c81]/10 dark:bg-[#cbdde1]/10 flex items-center justify-center" style="display: none;">
                    <span class="text-xs font-medium text-[#086c81] dark:text-[#cbdde1]">
                      ${o.charAt(0).toUpperCase()}
                    </span>
                  </div>
                `:`
                  <div class="w-8 h-8 rounded-full bg-[#086c81]/10 dark:bg-[#cbdde1]/10 flex items-center justify-center">
                    <span class="text-xs font-medium text-[#086c81] dark:text-[#cbdde1]">
                      ${o.charAt(0).toUpperCase()}
                    </span>
                  </div>
                `}
                <span class="font-medium">${o}</span>
              </div>
              <span>${a} min read</span>
            </div>

            <!-- Relays -->
            ${i.length>0?`
              <div class="flex flex-col space-y-1">
                <span class="text-sm text-neutral-600 dark:text-neutral-400">Published on relays:</span>
                <div class="flex flex-wrap gap-1">
                  ${i.slice(0,3).map(I=>`
                    <code class="text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                      ${I.replace("wss://","").replace("ws://","")}
                    </code>
                  `).join("")}
                  ${i.length>3?`
                    <span class="text-xs text-neutral-500 dark:text-neutral-400">
                      +${i.length-3} more
                    </span>
                  `:""}
                </div>
              </div>
            `:`
              <div class="text-xs text-neutral-500 dark:text-neutral-400">
                Relay information not available
              </div>
            `}
            
            <!-- Event ID -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Event ID:</span>
              <code class="text-xs font-mono text-[#086c81] dark:text-[#cbdde1] bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                ${e.eventId?e.eventId.slice(0,16)+"...":"N/A"}
              </code>
            </div>
          </div>
          
          <!-- Read on Nostr Button -->
          <div class="mt-6">
            <a 
              href="https://njump.me/${e.eventId||e.id}"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full inline-flex items-center justify-center px-4 py-2 bg-[#086c81] hover:bg-[#022229] text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <img src="${$}" alt="Nostr" class="w-4 h-4 mr-2 rounded bg-transparent" style="object-fit:contain;" />
              Read on Nostr
            </a>
          </div>
        </div>
      `,p.appendChild(m)}))}async function g(){try{c("loading"),console.log("Starting to fetch Nostr articles...");const r=await k.fetchArticles(E,10);console.log("Fetched articles:",r),r.length===0?(console.log("No articles found"),c("no-articles")):(console.log(`Found ${r.length} articles, rendering...`),S(r),c("articles"))}catch(r){console.error("Error fetching Nostr articles:",r),w&&(w.textContent=r.message||"Failed to load articles from Nostr network"),c("error")}}L?.addEventListener("click",g);document.addEventListener("DOMContentLoaded",g);g();
