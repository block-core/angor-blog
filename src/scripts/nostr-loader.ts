import { getAuthorProfile } from "@utils/nostr";

class NostrProfileLoader {
  private loadedProfiles = new Map<string, any>();
  private loadingPromises = new Map<string, Promise<any>>();

  async loadProfile(pubkey: string) {
    if (this.loadedProfiles.has(pubkey)) {
      return this.loadedProfiles.get(pubkey);
    }

    if (this.loadingPromises.has(pubkey)) {
      return this.loadingPromises.get(pubkey);
    }

    const promise = getAuthorProfile(pubkey);
    this.loadingPromises.set(pubkey, promise);

    try {
      const profile = await promise;
      this.loadedProfiles.set(pubkey, profile);
      this.loadingPromises.delete(pubkey);
      return profile;
    } catch (error) {
      this.loadingPromises.delete(pubkey);
      console.error('Error loading Nostr profile:', error);
      return null;
    }
  }

  async updateAllElements() {
    const elements = document.querySelectorAll('[data-nostr-pubkey]');
    
    for (const element of elements) {
      const pubkey = element.getAttribute('data-nostr-pubkey');
      if (!pubkey) continue;

      try {
        const profile = await this.loadProfile(pubkey);
        if (profile) {
          this.updateElement(element, profile);
        }
      } catch (error) {
        console.error('Error updating element:', error);
      }
    }
  }

  private updateElement(element: Element, profile: any) {
    // Update author names
    const authorNameEl = element.querySelector('[data-author-name]');
    if (authorNameEl && (profile.name || profile.display_name)) {
      authorNameEl.textContent = profile.display_name || profile.name;
    }

    // Update author roles
    const authorRoleEl = element.querySelector('[data-author-role]');
    if (authorRoleEl && profile.about) {
      authorRoleEl.textContent = profile.about;
    }

    // Update avatar images
    const avatarContainer = element.querySelector('[data-nostr-avatar]');
    if (avatarContainer && profile.picture) {
      const imageEl = avatarContainer.querySelector('[data-author-image]') as HTMLImageElement;
      const defaultAvatarEl = avatarContainer.querySelector('[data-default-avatar]') as HTMLElement;
      
      if (imageEl) {
        imageEl.src = profile.picture;
        if (profile.display_name || profile.name) {
          imageEl.alt = `${profile.display_name || profile.name} avatar`;
        }
        
        imageEl.classList.remove('hidden');
        if (defaultAvatarEl) {
          defaultAvatarEl.classList.add('hidden');
        }
      }
    }
  }
}

const nostrLoader = new NostrProfileLoader();

// Initialize when DOM is ready
function initializeNostrLoader() {
  nostrLoader.updateAllElements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNostrLoader);
} else {
  initializeNostrLoader();
}

// Re-run when new content is added
const observer = new MutationObserver(() => {
  nostrLoader.updateAllElements();
});

observer.observe(document.body, { childList: true, subtree: true });

export default nostrLoader;
