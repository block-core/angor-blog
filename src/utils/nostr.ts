import { SimplePool, type Event, nip19 } from 'nostr-tools';

// Type definitions for window.nostr (NIP-07)
declare global {
  interface Window {
    nostr?: {
      getPublicKey(): Promise<string>;
      signEvent(event: any): Promise<Event>;
      nip04?: {
        encrypt(pubkey: string, plaintext: string): Promise<string>;
        decrypt(pubkey: string, ciphertext: string): Promise<string>;
      };
    };
  }
}

export interface NostrAuthorProfile {
  name?: string;
  display_name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
  website?: string;
  lud16?: string;
  pubkey: string;
  npub: string;
}

export interface NostrArticle {
  id: string;
  title: string;
  summary?: string;
  content: string;
  author: string;
  authorProfile?: NostrAuthorProfile;
  publishedAt: number;
  tags: string[];
  dTag?: string;
  eventId: string;
  relays: string[];
  npub: string;
  slug?: string;
  image?: string;
}

export interface NostrUser {
  pubkey: string;
  npub: string;
  connected: boolean;
}

export interface NostrMessage {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: number;
  encrypted: boolean;
}

export class NostrService {
  private pool: SimplePool;
  private relays: string[];
  private profileCache: Map<string, NostrAuthorProfile> = new Map();

  constructor(relays: string[] = [
    'wss://relay.angor.io',
    'wss://relay.damus.io',
    'wss://relay.snort.social',
    'wss://nos.lol',
    'wss://relay.nostr.band'
  ]) {
    this.pool = new SimplePool();
    this.relays = relays;
  }

  /**
   * Convert npub to hex pubkey
   */
  npubToHex(npub: string): string {
    try {
      const decoded = nip19.decode(npub);
      if (decoded.type === 'npub') {
        return decoded.data;
      }
      throw new Error('Invalid npub format');
    } catch (error) {
      console.error('Error decoding npub:', error);
      throw error;
    }
  }

  /**
   * Convert hex pubkey to npub
   */
  hexToNpub(pubkey: string): string {
    try {
      return nip19.npubEncode(pubkey);
    } catch (error) {
      console.error('Error encoding pubkey to npub:', error);
      throw error;
    }
  }

  /**
   * Fetch author profile from Nostr network
   */
  async fetchAuthorProfile(npubOrHex: string): Promise<NostrAuthorProfile | null> {
    try {
      let pubkey: string;
      let npub: string;

      // Determine if input is npub or hex
      if (npubOrHex.startsWith('npub')) {
        pubkey = this.npubToHex(npubOrHex);
        npub = npubOrHex;
      } else {
        pubkey = npubOrHex;
        npub = this.hexToNpub(pubkey);
      }

      // Check cache first
      const cacheKey = pubkey;
      if (this.profileCache.has(cacheKey)) {
        return this.profileCache.get(cacheKey)!;
      }

      // Fetch profile from Nostr relays
      const events = await this.pool.querySync(this.relays, {
        kinds: [0], // Profile metadata events
        authors: [pubkey],
        limit: 1
      });

      if (events.length === 0) {
        console.warn(`No profile found for pubkey: ${pubkey}`);
        return null;
      }

      // Get the most recent profile event
      const profileEvent = events.sort((a, b) => b.created_at - a.created_at)[0];
      
      let profileData: any = {};
      try {
        profileData = JSON.parse(profileEvent.content);
      } catch (error) {
        console.error('Error parsing profile content:', error);
        profileData = {};
      }

      const profile: NostrAuthorProfile = {
        name: profileData.name || '',
        display_name: profileData.display_name || profileData.displayName || '',
        about: profileData.about || '',
        picture: profileData.picture || '',
        nip05: profileData.nip05 || '',
        website: profileData.website || '',
        lud16: profileData.lud16 || '',
        pubkey,
        npub
      };

      // Cache the profile
      this.profileCache.set(cacheKey, profile);

      return profile;
    } catch (error) {
      console.error('Error fetching author profile:', error);
      return null;
    }
  }

  /**
   * Fetch Nostr articles (kind 30023) from a specific author
   */
  async fetchArticles(npubOrHex: string, limit: number = 20): Promise<NostrArticle[]> {
    try {
      let pubkey: string;
      let npub: string;

      // Determine if input is npub or hex
      if (npubOrHex.startsWith('npub')) {
        pubkey = this.npubToHex(npubOrHex);
        npub = npubOrHex;
      } else {
        pubkey = npubOrHex;
        npub = this.hexToNpub(pubkey);
      }

      // Fetch articles from Nostr relays
      const events = await this.pool.querySync(this.relays, {
        kinds: [30023], // Long-form content events
        authors: [pubkey],
        limit
      });

      if (events.length === 0) {
        console.warn(`No articles found for pubkey: ${pubkey}`);
        return [];
      }

      // Get author profile
      const authorProfile = await this.fetchAuthorProfile(pubkey);

      // Sort events by creation time (newest first)
      const sortedEvents = events.sort((a, b) => b.created_at - a.created_at);

      const articles: NostrArticle[] = [];

      for (const event of sortedEvents) {
        try {
          // Parse tags to extract metadata
          const tags = new Map(event.tags.map(tag => [tag[0], tag[1]]));
          
          const title = tags.get('title') || 'Untitled';
          const summary = tags.get('summary') || '';
          const dTag = tags.get('d') || '';
          const image = tags.get('image') || '';
          const slug = dTag || event.id.substring(0, 8);

          // Extract hashtags from 't' tags
          const hashtags = event.tags
            .filter(tag => tag[0] === 't')
            .map(tag => tag[1])
            .filter(Boolean);

          const article: NostrArticle = {
            id: event.id,
            title,
            summary,
            content: event.content,
            author: this.getDisplayName(authorProfile) || npub.slice(0, 16) + '...',
            authorProfile: authorProfile || undefined,
            publishedAt: event.created_at,
            tags: hashtags,
            dTag,
            eventId: event.id,
            relays: this.relays,
            npub,
            slug,
            image
          };

          articles.push(article);
        } catch (error) {
          console.error('Error parsing article event:', error);
        }
      }

      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  /**
   * Get display name for author with proper fallback
   */
  getDisplayName(profile: NostrAuthorProfile | null): string {
    if (!profile) return 'Anonymous';
    return profile.display_name || profile.name || profile.npub.slice(0, 16) + '...';
  }

  /**
   * Get author image with fallback
   */
  getAuthorImage(profile: NostrAuthorProfile): string {
    return profile.picture || '/images/blog/default-avatar.avif';
  }

  /**
   * Close connections when done
   */
  close(): void {
    this.pool.close(this.relays);
  }

  /**
   * Fetch a specific article by d-tag or event ID
   */
  async fetchArticle(npubOrHex: string, dTagOrEventId: string): Promise<NostrArticle | null> {
    try {
      let pubkey: string;
      let npub: string;

      if (npubOrHex.startsWith('npub')) {
        pubkey = this.npubToHex(npubOrHex);
        npub = npubOrHex;
      } else {
        pubkey = npubOrHex;
        npub = this.hexToNpub(pubkey);
      }

      // Try to fetch by d-tag first (parametrized replaceable events)
      let events = await this.pool.querySync(this.relays, {
        kinds: [30023],
        authors: [pubkey],
        '#d': [dTagOrEventId],
        limit: 1
      });

      // If not found by d-tag, try by event ID
      if (events.length === 0) {
        events = await this.pool.querySync(this.relays, {
          kinds: [30023],
          ids: [dTagOrEventId],
          limit: 1
        });
      }

      if (events.length === 0) {
        return null;
      }

      const event = events[0];
      const authorProfile = await this.fetchAuthorProfile(pubkey);

      // Parse tags
      const tags = new Map(event.tags.map(tag => [tag[0], tag[1]]));
      const title = tags.get('title') || 'Untitled';
      const summary = tags.get('summary') || '';
      const dTag = tags.get('d') || '';
      const image = tags.get('image') || '';

      const hashtags = event.tags
        .filter(tag => tag[0] === 't')
        .map(tag => tag[1])
        .filter(Boolean);      return {
        id: event.id,
        title,
        summary,
        content: event.content,
        author: authorProfile?.display_name || authorProfile?.name || npub.slice(0, 16) + '...',
        authorProfile: authorProfile || undefined,
        publishedAt: event.created_at,
        tags: hashtags,
        dTag,
        eventId: event.id,
        relays: this.relays,
        npub,
        slug: dTag || event.id.substring(0, 8),
        image
      };
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  /**
   * Check if user has a Nostr extension (NIP-07)
   */
  hasNostrExtension(): boolean {
    return typeof window !== 'undefined' && window.nostr !== undefined;
  }

  /**
   * Connect to user's Nostr extension and get their public key
   */
  async connectUser(): Promise<NostrUser | null> {
    if (!this.hasNostrExtension()) {
      throw new Error('No Nostr extension found. Please install a Nostr extension like Alby, nos2x, or Flamingo.');
    }

    try {
      if (!window.nostr) {
        throw new Error('Nostr extension not available');
      }
      
      const pubkey = await window.nostr.getPublicKey();
      const npub = this.hexToNpub(pubkey);
      
      return {
        pubkey,
        npub,
        connected: true
      };
    } catch (error) {
      console.error('Error connecting to Nostr extension:', error);
      throw new Error('Failed to connect to Nostr extension. Please check your extension settings.');
    }
  }
  /**
   * Send an encrypted direct message to a recipient
   */
  async sendDirectMessage(
    senderPubkey: string,
    recipientNpubOrHex: string,
    message: string
  ): Promise<string> {
    if (!this.hasNostrExtension() || !window.nostr) {
      throw new Error('No Nostr extension found');
    }

    try {
      // Convert recipient npub to hex if needed
      let recipientPubkey: string;
      if (recipientNpubOrHex.startsWith('npub')) {
        recipientPubkey = this.npubToHex(recipientNpubOrHex);
      } else {
        recipientPubkey = recipientNpubOrHex;
      }

      // Check if nip04 encryption is available
      if (!window.nostr.nip04) {
        throw new Error('Nostr extension does not support message encryption (NIP-04)');
      }

      // Encrypt the message using NIP-04
      const encryptedContent = await window.nostr.nip04.encrypt(recipientPubkey, message);

      // Create the direct message event (kind 4)
      const event = {
        kind: 4,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['p', recipientPubkey]],
        content: encryptedContent,
        pubkey: senderPubkey
      };

      // Sign the event using the extension
      const signedEvent = await window.nostr.signEvent(event);

      // Publish to relays
      const publishResults = await Promise.allSettled(
        this.relays.map(relay => 
          this.pool.publish([relay], signedEvent)
        )
      );

      const successfulPublishes = publishResults.filter(
        result => result.status === 'fulfilled'
      ).length;

      if (successfulPublishes === 0) {
        throw new Error('Failed to publish message to any relay');
      }

      console.log(`Message published to ${successfulPublishes}/${this.relays.length} relays`);
      return signedEvent.id;

    } catch (error) {
      console.error('Error sending direct message:', error);
      throw error;
    }
  }
  /**
   * Get user's received direct messages
   */
  async getDirectMessages(userPubkey: string, limit: number = 50): Promise<NostrMessage[]> {
    try {
      const events = await this.pool.querySync(this.relays, {
        kinds: [4], // Direct message events
        '#p': [userPubkey], // Messages to this user
        limit
      });

      const messages: NostrMessage[] = [];

      for (const event of events) {
        try {
          // Decrypt the message if we have the extension
          let content = event.content;
          let encrypted = true;

          if (this.hasNostrExtension() && window.nostr && window.nostr.nip04) {
            try {
              content = await window.nostr.nip04.decrypt(event.pubkey, event.content);
              encrypted = false;
            } catch (decryptError) {
              console.warn('Failed to decrypt message:', decryptError);
              // Keep encrypted content
            }
          }

          messages.push({
            id: event.id,
            content,
            sender: event.pubkey,
            recipient: userPubkey,
            timestamp: event.created_at,
            encrypted
          });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }

      return messages.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error fetching direct messages:', error);
      return [];
    }
  }
}

// Create a singleton instance
export const nostrService = new NostrService();

// Utility function to get author profile with fallback
export async function getAuthorProfile(npubOrHex?: string): Promise<NostrAuthorProfile | null> {
  if (!npubOrHex) {
    return null;
  }

  try {
    return await nostrService.fetchAuthorProfile(npubOrHex);
  } catch (error) {
    console.error('Failed to fetch author profile:', error);
    return null;
  }
}

// Utility function to fetch articles
export async function getNostrArticles(npubOrHex: string, limit: number = 20): Promise<NostrArticle[]> {
  try {
    return await nostrService.fetchArticles(npubOrHex, limit);
  } catch (error) {
    console.error('Failed to fetch Nostr articles:', error);
    return [];
  }
}

// Utility function to fetch a single article
export async function getNostrArticle(npubOrHex: string, dTagOrEventId: string): Promise<NostrArticle | null> {
  try {
    return await nostrService.fetchArticle(npubOrHex, dTagOrEventId);
  } catch (error) {
    console.error('Failed to fetch Nostr article:', error);
    return null;
  }
}
