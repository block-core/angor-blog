import { nip19 } from 'nostr-tools';

interface MediaExtensions {
    readonly image: readonly string[];
    readonly video: readonly string[];
    readonly audio: readonly string[];
}

export interface ParsedToken {
    safeWord?: string;
    word: string;
    token: TokenType;
    embedId?: string;
}

type TokenType = 'text' | 'npub' | 'note' | 'image' | 'video' | 'audio' | 'youtube' | 'spotify' | 'tidal' | 'link';

export class ParseContentService {
    private readonly MEDIA_EXTENSIONS: MediaExtensions = {
        image: ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.apng', '.jfif', '.svg'] as const,
        video: ['.mp4', '.m4v', '.m4p', '.mpg', '.mpeg', '.webm', '.avif', '.mov', '.ogv'] as const,
        audio: ['.mp3', '.m4a', '.flac', '.ogg', '.wav'] as const,
    };

    private readonly MEDIA_PLATFORMS = {
        YOUTUBE: ['youtu.be', 'youtube.com'],
        SPOTIFY: ['open.spotify.com'],
        TIDAL: ['tidal.com'],
    } as const;

    parseContent(text: string): (string | ParsedToken)[] {
        const sanitizedText = this.sanitizeText(text);
        // Handle markdown images first
        const textWithMarkdownImages = this.processMarkdownImages(sanitizedText);
        const tokens = this.tokenizeText(textWithMarkdownImages);
        return this.combinePlainText(tokens.map(token => this.processToken(token)));
    }

    private sanitizeText(text: string): string {
        return text.replaceAll(/\p{Cf}/gu, '');
    }

    private processMarkdownImages(text: string): string {
        // Replace markdown images with special tokens that will be processed later
        return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
            const cleanUrl = this.cleanImageUrl(url);
            if (this.isValidImageUrl(cleanUrl)) {
                // Replace with a special token that includes the cleaned URL
                return `MARKDOWN_IMAGE:${cleanUrl}`;
            }
            return match; // Keep original if not a valid image
        });
    }

    private cleanImageUrl(url: string): string {
        // Remove any extra parentheses or special characters that might break the URL
        return url.trim()
            .replace(/^\(+/, '')  // Remove leading parentheses
            .replace(/\)+$/, '')  // Remove trailing parentheses
            .replace(/\s+/g, '%20'); // Replace spaces with URL encoding
    }

    private isValidImageUrl(url: string): boolean {
        const imageExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.apng', '.jfif', '.svg'];
        const lowerUrl = url.toLowerCase();
        return imageExtensions.some(ext => lowerUrl.includes(ext)) || 
               url.startsWith('data:image/') || 
               url.includes('image.nostr.build') ||
               url.includes('cdn.') ||
               url.includes('imgur.com');
    }

    private tokenizeText(text: string): string[] {
        // Split by spaces, newlines, nostr references, and markdown image tokens while preserving them
        return text.split(/(\s+|nostr:[a-zA-Z0-9]+|https?:\/\/[^\s]+|MARKDOWN_IMAGE:[^\s]+)/).filter(Boolean);
    }

    private isMediaType(url: string, extensions: readonly string[]): boolean {
        return extensions.some(ext => url.toLowerCase().includes(ext));
    }

    private isMediaPlatform(url: string, platforms: readonly string[]): boolean {
        return platforms.some(platform => url.includes(platform));
    }

    private processToken(token: string): string | ParsedToken {
        if (token.startsWith('MARKDOWN_IMAGE:')) {
            const imageUrl = token.substring('MARKDOWN_IMAGE:'.length);
            return this.createMediaToken(imageUrl, 'image');
        }
        if (token.startsWith('nostr:')) return this.processNostrToken(token);
        if (token.startsWith('@npub') || token.startsWith('@note')) return this.processUsernameToken(token);
        if (this.isUrl(token)) return this.processLinkToken(token);
        return token;
    }

    private isUrl(token: string): boolean {
        return token.startsWith('http://') || token.startsWith('https://');
    }

    private combinePlainText(tokens: (string | ParsedToken)[]): (string | ParsedToken)[] {
        const result: (string | ParsedToken)[] = [];
        let currentText = '';

        tokens.forEach(token => {
            if (typeof token === 'string') {
                currentText += token;
            } else {
                if (currentText) {
                    result.push(currentText);
                    currentText = '';
                }
                result.push(token);
            }
        });

        if (currentText) {
            result.push(currentText);
        }

        return result;
    }

    private processNostrToken(token: string): ParsedToken {
        try {
            const nostrId = token.substring(6);
            const decoded = nip19.decode(nostrId);
            return {
                safeWord: token,
                word: decoded.data as string,
                token: decoded.type as TokenType,
            };
        } catch (error) {
            console.warn('Failed to decode nostr token:', error);
            return { word: token, token: 'text' };
        }
    }

    private processUsernameToken(token: string): string | ParsedToken {
        try {
            const nostrId = token.substring(1); // Remove @
            if (nostrId.startsWith('npub') || nostrId.startsWith('note')) {
                const decoded = nip19.decode(nostrId);
                return {
                    safeWord: token,
                    word: decoded.data as string,
                    token: decoded.type as TokenType,
                };
            }
        } catch (error) {
            console.warn('Failed to decode username token:', error);
        }
        return token;
    }

    private processLinkToken(url: string): ParsedToken {
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.image)) {
            return this.createMediaToken(url, 'image');
        }
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.video)) {
            return this.createMediaToken(url, 'video');
        }
        if (this.isMediaType(url, this.MEDIA_EXTENSIONS.audio)) {
            return this.createMediaToken(url, 'audio');
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.YOUTUBE)) {
            return this.processYouTubeLink(url);
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.SPOTIFY)) {
            return this.processSpotifyLink(url);
        }
        if (this.isMediaPlatform(url, this.MEDIA_PLATFORMS.TIDAL)) {
            return this.processTidalLink(url);
        }

        return { word: url, token: 'link' };
    }

    private createMediaToken(url: string, type: TokenType): ParsedToken {
        return {
            safeWord: url,
            word: url,
            token: type,
        };
    }

    private processYouTubeLink(url: string): ParsedToken {
        const youtubeId = this.extractYouTubeId(url);
        const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
        return {
            safeWord: embedUrl,
            word: url,
            token: 'youtube',
            embedId: youtubeId,
        };
    }

    private processSpotifyLink(url: string): ParsedToken {
        const embedUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/');
        return {
            safeWord: embedUrl,
            word: url,
            token: 'spotify',
        };
    }

    private processTidalLink(url: string): ParsedToken {
        const embedUrl = url.replace('tidal.com/browse/track/', 'embed.tidal.com/tracks/');
        return {
            safeWord: embedUrl,
            word: url,
            token: 'tidal',
        };
    }

    private extractYouTubeId(url: string): string {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\n?#]+)/);
        return match?.[1] ?? '';
    }
}

// Create singleton instance
export const parseContentService = new ParseContentService();

// Utility functions
export function parseNostrContent(content: string): (string | ParsedToken)[] {
    return parseContentService.parseContent(content);
}

export function extractFirstImage(content: string): string | null {
    // First check for markdown images
    const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const markdownMatch = content.match(markdownImageRegex);
    if (markdownMatch && markdownMatch[2]) {
        const imageUrl = markdownMatch[2].trim()
            .replace(/^\(+/, '')  // Remove leading parentheses
            .replace(/\)+$/, '')  // Remove trailing parentheses
            .replace(/\s+/g, '%20'); // Replace spaces with URL encoding
        
        const imageExtensions = ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.apng', '.jfif', '.svg'];
        const lowerUrl = imageUrl.toLowerCase();
        const isValidImage = imageExtensions.some(ext => lowerUrl.includes(ext)) || 
               imageUrl.startsWith('data:image/') || 
               imageUrl.includes('image.nostr.build') ||
               imageUrl.includes('cdn.') ||
               imageUrl.includes('imgur.com');
               
        if (isValidImage) {
            return imageUrl;
        }
    }

    // Then check for direct image URLs
    const tokens = parseContentService.parseContent(content);
    const imageToken = tokens.find((token): token is ParsedToken => 
        typeof token === 'object' && token.token === 'image'
    );
    return imageToken?.safeWord || null;
}
