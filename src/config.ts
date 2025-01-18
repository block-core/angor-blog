import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Angor Blog',
  subtitle: 'A decentralized crowdfunding protocol built on Bitcoin and Nostr',
  lang: 'en',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 185,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: true,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.svg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 2                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'GitHub',
      url: 'https://github.com/block-core/angor',     
      external: true,                               
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/angor.svg',  
  name: 'Angor',
  bio: 'P2P Funding Protocol',
  links: [
    {
      name: 'Angor',
      icon: 'fa6-brands:bitcoin',
      url: 'https://angor.io',
    },
    {
      name: 'Hub',
      icon: 'fa6-brands:github',  
      url: 'https://hub.angor.io',
    },
    {
      name: 'Docs',
      icon: 'fa6-solid:book',    
      url: 'https://docs.angor.io',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'MIT',
  url: 'https://github.com/block-core/angor/blob/main/LICENSE',
}
