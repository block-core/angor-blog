interface ImageToggle {
    cleanup: () => void;
    setupImageToggle: () => void;
}

export const imageToggle: ImageToggle = {
    cleanup: () => {},
    setupImageToggle: function() {
        this.cleanup();

        const toggleBtn = document.querySelector('#toggle-post-image') as HTMLButtonElement | null;
        const imageWrapper = document.querySelector('#post-image-wrapper') as HTMLDivElement | null;
        
        if (!toggleBtn || !imageWrapper) return;
        
        const toggleImage = (): void => {
            const isHidden = imageWrapper?.classList.contains('hidden');
            imageWrapper?.classList.toggle('hidden');
            toggleBtn?.classList.toggle('bg-[var(--primary)]');
        }
        
        toggleBtn.addEventListener('click', toggleImage);
        
        this.cleanup = () => toggleBtn.removeEventListener('click', toggleImage);
    }
};
