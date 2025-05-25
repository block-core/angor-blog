<script lang="ts">
import { onMount } from 'svelte';
import Icon from '@iconify/svelte';
import type { CollectionEntry } from 'astro:content';
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

interface Props {
    posts: CollectionEntry<"posts">[];
    class?: string;
}

let { posts, class: className = '' }: Props = $props();

let storiesContainer: HTMLElement;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    startX = e.pageX - storiesContainer.offsetLeft;
    scrollLeft = storiesContainer.scrollLeft;
    storiesContainer.style.cursor = 'grabbing';
}

function handleMouseLeave() {
    isDragging = false;
    storiesContainer.style.cursor = 'grab';
}

function handleMouseUp() {
    isDragging = false;
    storiesContainer.style.cursor = 'grab';
}

function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - storiesContainer.offsetLeft;
    const walk = (x - startX) * 2;
    storiesContainer.scrollLeft = scrollLeft - walk;
}

function handleTouchStart(e: TouchEvent) {
    isDragging = true;
    startX = e.touches[0].pageX - storiesContainer.offsetLeft;
    scrollLeft = storiesContainer.scrollLeft;
}

function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    const x = e.touches[0].pageX - storiesContainer.offsetLeft;
    const walk = (x - startX) * 2;
    storiesContainer.scrollLeft = scrollLeft - walk;
}

function handleTouchEnd() {
    isDragging = false;
}

function scrollStories(direction: 'left' | 'right') {
    const scrollAmount = 200;
    if (direction === 'left') {
        storiesContainer.scrollLeft -= scrollAmount;
    } else {
        storiesContainer.scrollLeft += scrollAmount;
    }
}

function formatTitle(title: string) {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
}

function getPostImageUrl(post: CollectionEntry<"posts">) {
    if (post.data.image) {
        // Handle different image path types
        if (post.data.image.startsWith('/')) {
            // Absolute path from public folder (e.g., '/images/bitcoin.svg')
            return post.data.image;
        } else if (post.data.image.startsWith('http')) {
            // External URL
            return post.data.image;
        } else {
            // Relative path - assume it's from public/images folder
            return `/images/${post.data.image}`;
        }
    }
    // Fallback to gradient if no image
    return createGradientImage(post);
}

function createGradientImage(post: CollectionEntry<"posts">) {
    // Create a consistent gradient based on the post title hash
    const hash = post.data.title.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    const hue = Math.abs(hash % 360);
    return `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad${hue}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:hsl(${hue}, 70%, 60%);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:hsl(${(hue + 60) % 360}, 70%, 40%);stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grad${hue})" />
            <text x="50" y="50" font-family="system-ui,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dy="0.3em">
                ${post.data.title.charAt(0).toUpperCase()}
            </text>
        </svg>
    `)}`;
}

onMount(() => {
    // Add scroll event listeners for better UX
    storiesContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        storiesContainer.scrollLeft += e.deltaY;
    });
});
</script>

<div class="stories-wrapper {className}">
    <div class="stories-header">
        <h2 class="stories-title">
            <span class="title-icon">📖</span>
            {i18n(I18nKey.latestStories)}
        </h2>
        <div class="stories-controls">
            <button 
                class="control-btn"
                onclick={() => scrollStories('left')}
                aria-label="Scroll left"
            >
                <Icon icon="material-symbols:chevron-left-rounded" />
            </button>
            <button 
                class="control-btn"
                onclick={() => scrollStories('right')}
                aria-label="Scroll right"
            >
                <Icon icon="material-symbols:chevron-right-rounded" />
            </button>
        </div>
    </div>

    <div 
        bind:this={storiesContainer}
        class="stories-container"
        onmousedown={handleMouseDown}
        onmouseleave={handleMouseLeave}
        onmouseup={handleMouseUp}
        onmousemove={handleMouseMove}
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
    >
        {#each posts.slice(0, 20) as post, index}
            <a 
                href={`/posts/${post.slug}/`}
                class="story-item"
                style="animation-delay: {index * 50}ms"
                aria-label={post.data.title}
            >
                <div class="story-ring">
                    <div class="story-content">                        <div class="story-image">
                            <img 
                                src={getPostImageUrl(post)} 
                                alt={post.data.title}
                                loading="lazy"
                                onerror={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = createGradientImage(post);
                                }}
                            />
                        </div>
                        <div class="story-overlay">
                            <Icon icon="material-symbols:play-circle-outline" class="play-icon" />
                        </div>
                    </div>
                </div>
                <div class="story-title">
                    {formatTitle(post.data.title)}
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
/* Main container */
.stories-wrapper {
    margin-bottom: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--radius-large);
    padding: 1rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    animation: fadeInUp 0.6s ease-out;
    /* Force visibility to override onload-animation */
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
}

/* Override onload-animation specifically for stories */
.stories-wrapper.onload-animation,
:global(.onload-animation) .stories-wrapper {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
    animation: fadeInUp 0.6s ease-out !important;
}

/* Header */
.stories-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.stories-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.title-icon {
    font-size: 1.5rem;
}

.stories-controls {
    display: flex;
    gap: 0.5rem;
}

.control-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--btn-plain-bg);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 1.25rem;
    /* Theme-aware colors: black in light mode, white in dark mode */
    color: rgba(0, 0, 0, 0.75);
}

:global(.dark) .control-btn {
    color: rgba(255, 255, 255, 0.75);
}

.control-btn:hover {
    background: var(--btn-plain-bg-hover);
    color: var(--primary);
}

.control-btn:active {
    background: var(--btn-plain-bg-active);
    transform: scale(0.95);
}

/* Stories container */
.stories-container {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    scroll-behavior: smooth;
}

.stories-container::-webkit-scrollbar {
    display: none;
}

/* Story items */
.story-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    animation: slideInFromLeft 0.5s ease-out both;
}

.story-ring {
    position: relative;
    background: linear-gradient(45deg, 
        var(--primary), 
        var(--primary-light, var(--primary)),
        var(--primary));
    border-radius: 50%;
    padding: 3px;
}

.story-content {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    background: var(--card-bg);
    border: 2px solid var(--card-bg);
}

.story-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
}

.story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.story-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
}

.play-icon {
    color: white;
    font-size: 1.5rem;
    filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.1));
}

.story-title {
    font-size: 0.75rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.75);
    max-width: 4.5rem;
    line-height: 1.25;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

:global(.dark) .story-title {
    color: rgba(255, 255, 255, 0.75);
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive design */
@media (max-width: 768px) {
    .stories-container {
        gap: 0.75rem;
    }
    
    .story-content {
        width: 3.5rem;
        height: 3.5rem;
    }
    
    .story-title {
        font-size: 0.6rem;
        max-width: 4rem;
    }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
    .story-ring {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .stories-wrapper {
        animation: none;
    }
    
    .story-item {
        animation: none;
    }
    
    .stories-container {
        scroll-behavior: auto;
    }
}

@media (prefers-reduced-motion: no-preference) {
    .stories-container {
        scroll-behavior: smooth;
    }
}
</style>
