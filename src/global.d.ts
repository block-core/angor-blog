import type { AstroIntegration } from '@swup/astro'

declare global {
  interface Window {
    // type from '@swup/astro' is incorrect
    swup: AstroIntegration
    // Add pagefind typing
    pagefind?: {
      search: (query: string) => Promise<{
        results: Array<{
          data: () => Promise<{
            url: string
            meta: { title: string }
            excerpt: string
          }>
        }>
      }>
      options: (options: any) => Promise<void>
      init: () => void
    }
  }
}
