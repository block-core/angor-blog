import{a as f,n as k}from"./nostr.DwV-zqXQ.js";class I{MEDIA_EXTENSIONS={image:[".jpg",".jpeg",".gif",".png",".webp",".apng",".jfif",".svg"],video:[".mp4",".m4v",".m4p",".mpg",".mpeg",".webm",".avif",".mov",".ogv"],audio:[".mp3",".m4a",".flac",".ogg",".wav"]};MEDIA_PLATFORMS={YOUTUBE:["youtu.be","youtube.com"],SPOTIFY:["open.spotify.com"],TIDAL:["tidal.com"]};parseContent(e){const t=this.sanitizeText(e),s=this.tokenizeText(t);return this.combinePlainText(s.map(n=>this.processToken(n)))}sanitizeText(e){return e.replaceAll(/\p{Cf}/gu,"")}tokenizeText(e){return e.split(/(\s+|nostr:[a-zA-Z0-9]+|https?:\/\/[^\s]+)/).filter(Boolean)}isMediaType(e,t){return t.some(s=>e.toLowerCase().includes(s))}isMediaPlatform(e,t){return t.some(s=>e.includes(s))}processToken(e){return e.startsWith("nostr:")?this.processNostrToken(e):e.startsWith("@npub")||e.startsWith("@note")?this.processUsernameToken(e):this.isUrl(e)?this.processLinkToken(e):e}isUrl(e){return e.startsWith("http://")||e.startsWith("https://")}combinePlainText(e){const t=[];let s="";return e.forEach(n=>{typeof n=="string"?s+=n:(s&&(t.push(s),s=""),t.push(n))}),s&&t.push(s),t}processNostrToken(e){try{const t=e.substring(6),s=f.decode(t);return{safeWord:e,word:s.data,token:s.type}}catch(t){return console.warn("Failed to decode nostr token:",t),{word:e,token:"text"}}}processUsernameToken(e){try{const t=e.substring(1);if(t.startsWith("npub")||t.startsWith("note")){const s=f.decode(t);return{safeWord:e,word:s.data,token:s.type}}}catch(t){console.warn("Failed to decode username token:",t)}return e}processLinkToken(e){return this.isMediaType(e,this.MEDIA_EXTENSIONS.image)?this.createMediaToken(e,"image"):this.isMediaType(e,this.MEDIA_EXTENSIONS.video)?this.createMediaToken(e,"video"):this.isMediaType(e,this.MEDIA_EXTENSIONS.audio)?this.createMediaToken(e,"audio"):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.YOUTUBE)?this.processYouTubeLink(e):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.SPOTIFY)?this.processSpotifyLink(e):this.isMediaPlatform(e,this.MEDIA_PLATFORMS.TIDAL)?this.processTidalLink(e):{word:e,token:"link"}}createMediaToken(e,t){return{safeWord:e,word:e,token:t}}processYouTubeLink(e){const t=this.extractYouTubeId(e);return{safeWord:`https://www.youtube.com/embed/${t}`,word:e,token:"youtube",embedId:t}}processSpotifyLink(e){return{safeWord:e.replace("open.spotify.com/","open.spotify.com/embed/"),word:e,token:"spotify"}}processTidalLink(e){return{safeWord:e.replace("tidal.com/browse/track/","embed.tidal.com/tracks/"),word:e,token:"tidal"}}extractYouTubeId(e){return e.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\n?#]+)/)?.[1]??""}}const v=new I;function E(r){return v.parseContent(r)}function A(r){return v.parseContent(r).find(s=>typeof s=="object"&&s.token==="image")?.safeWord||null}const M="npub1wrzguj625auyeysfuuxzf7ywhzlwfz9gm3fml2lul72gwqxw8n9swtcm02",h=document.getElementById("loading-state"),g=document.getElementById("error-state"),x=document.getElementById("no-articles-state"),b=document.getElementById("articles-grid"),m=document.getElementById("articles-container"),y=document.getElementById("error-message"),$=document.getElementById("retry-button");function i(r){switch(h?.classList.add("hidden"),g?.classList.add("hidden"),x?.classList.add("hidden"),b?.classList.add("hidden"),r){case"loading":h?.classList.remove("hidden");break;case"error":g?.classList.remove("hidden");break;case"no-articles":x?.classList.remove("hidden");break;case"articles":b?.classList.remove("hidden");break}}function L(r){return r.map(e=>{if(typeof e=="string")return e;switch(e.token){case"image":return`<img src="${e.safeWord}" alt="Content image" class="max-w-full h-auto rounded-lg my-4" loading="lazy" />`;case"video":return`<video controls class="max-w-full h-auto rounded-lg my-4"><source src="${e.safeWord}" /></video>`;case"youtube":return`<iframe src="${e.safeWord}" class="w-full aspect-video rounded-lg my-4" frameborder="0" allowfullscreen></iframe>`;case"spotify":return`<iframe src="${e.safeWord}" width="100%" height="352" frameborder="0" class="rounded-lg my-4"></iframe>`;case"link":return`<a href="${e.word}" target="_blank" rel="noopener noreferrer" class="text-[#086c81] hover:underline">${e.word}</a>`;case"npub":return`<span class="text-[#086c81] font-mono text-sm">@${e.word.slice(0,16)}...</span>`;default:return e.word}}).join("")}function S(r){m&&(m.innerHTML="",r.forEach(e=>{console.log("Rendering article:",e);const t=A(e.content)||e.image,s=e.summary||e.content.slice(0,300)+"...",n=Math.ceil(e.content.length/1e3),w=E(s),T=L(w);console.log("Article data:",{author:e.author,authorProfile:e.authorProfile,tags:e.tags,relays:e.relays,eventId:e.eventId});const a=e.authorProfile?.display_name||e.authorProfile?.name||e.author||"Anonymous",d=e.authorProfile?.picture,l=Array.isArray(e.tags)?e.tags:[],o=Array.isArray(e.relays)?e.relays:[];console.log("Processed metadata:",{authorName:a,authorPicture:d,articleTags:l,articleRelays:o});const c=document.createElement("article");c.className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300",c.innerHTML=`
        ${t?`
          <div class="aspect-video overflow-hidden">
            <img 
              src="${t}" 
              alt="${e.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
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
          
          <h3 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4 group-hover:text-[#086c81] dark:group-hover:text-[#cbdde1] transition-colors duration-200">
            ${e.title}
          </h3>
          
          <div class="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-4">
            ${T}
          </div>
          
          <!-- Article metadata -->
          <div class="space-y-4">
            <!-- Author and read time -->
            <div class="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
              <div class="flex items-center gap-3">
                ${d?`
                  <img 
                    src="${d}" 
                    alt="${a}" 
                    class="w-8 h-8 rounded-full"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                  />
                  <div class="w-8 h-8 rounded-full bg-[#086c81]/10 dark:bg-[#cbdde1]/10 flex items-center justify-center" style="display: none;">
                    <span class="text-xs font-medium text-[#086c81] dark:text-[#cbdde1]">
                      ${a.charAt(0).toUpperCase()}
                    </span>
                  </div>
                `:`
                  <div class="w-8 h-8 rounded-full bg-[#086c81]/10 dark:bg-[#cbdde1]/10 flex items-center justify-center">
                    <span class="text-xs font-medium text-[#086c81] dark:text-[#cbdde1]">
                      ${a.charAt(0).toUpperCase()}
                    </span>
                  </div>
                `}
                <span class="font-medium">${a}</span>
              </div>
              <span>${n} min read</span>
            </div>
            
            <!-- Tags -->
            ${l.length>0?`
              <div class="flex flex-wrap gap-2">
                ${l.map(u=>`
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                    #${u}
                  </span>
                `).join("")}
              </div>
            `:`
              <div class="text-xs text-neutral-500 dark:text-neutral-400">
                No tags available
              </div>
            `}
            
            <!-- Relays -->
            ${o.length>0?`
              <div class="flex flex-col space-y-1">
                <span class="text-sm text-neutral-600 dark:text-neutral-400">Published on relays:</span>
                <div class="flex flex-wrap gap-1">
                  ${o.slice(0,3).map(u=>`
                    <code class="text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded">
                      ${u.replace("wss://","").replace("ws://","")}
                    </code>
                  `).join("")}
                  ${o.length>3?`
                    <span class="text-xs text-neutral-500 dark:text-neutral-400">
                      +${o.length-3} more
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
              <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Read on Nostr
            </a>
          </div>
        </div>
      `,m.appendChild(c)}))}async function p(){try{i("loading"),console.log("Starting to fetch Nostr articles...");const r=await k.fetchArticles(M,10);console.log("Fetched articles:",r),r.length===0?(console.log("No articles found"),i("no-articles")):(console.log(`Found ${r.length} articles, rendering...`),S(r),i("articles"))}catch(r){console.error("Error fetching Nostr articles:",r),y&&(y.textContent=r.message||"Failed to load articles from Nostr network"),i("error")}}$?.addEventListener("click",p);document.addEventListener("DOMContentLoaded",p);p();
