import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Angor Blog',
  subtitle: 'Decentralized Crowdfunding Platform',
  lang: 'en', // 'en', 'zh_CN', 'zh_TW', 'ja'
  themeColor: {
    hue: 175, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.svg', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  },
  favicon: [
    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ],
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/block-core', // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.png', // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Angor',
  bio: 'Decentralized Crowdfunding Platform',
  links: [
    {
      name: 'Twitter',
      icon: 'fa6-brands:twitter', // Visit https://icones.js.org/ for icon codes
      // You will need to install the corresponding icon set if it's not already included
      // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://twitter.com/blockcoredev',
    },
    {
      name: 'Discord',
      icon: 'fa6-brands:discord',
      url: 'https://www.blockcore.net/discord',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/block-core/angor',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'MIT',
  url: 'https://github.com/block-core/angor-blog?tab=MIT-1-ov-file',
}
