# ✨ Angor Blog

**Welcome to the Angor Blog – Your Gateway to Cryptocurrency Insights**

Dive into the dynamic world of cryptocurrency with the Angor Blog, where we unravel the complexities of Bitcoin investments and explore the nuances of the financial landscape. Whether you're a seasoned investor or a crypto novice, our blog offers a treasure trove of information to enhance your understanding and refine your strategies.

Stay ahead of the curve with expert analyses, up-to-date news, and practical tips tailored to empower your investment journey. Our dedicated focus on Bitcoin and innovative features like decentralized operations on the Nostr protocol makes us a unique platform for all your crypto needs.

Join us at Angor as we navigate the evolving paths of the cryptocurrency world, offering you the tools to make informed decisions and maximize your investment potential.

## 🚀 How to Use

1. clone this repository, run `pnpm install` AND `pnpm add sharp` to install dependencies.  
   - Install [pnpm](https://pnpm.io) `npm install -g pnpm` if you haven't.
2. Run `pnpm new-post <filename>` to create a new post and edit it in `src/content/posts/`.

## ⚙️ Frontmatter of Posts

```yaml
---
title: My First Blog Post
published: 2024-05-08
description: This is the first post.
image: /images/cover.jpg
tags: [Foo, Bar, Angor]
category: Front-end
draft: false
---
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | Installs dependencies                            |
| `pnpm dev`                          | Starts local dev server at `localhost:4321`      |
| `pnpm build`                        | Build your production site to `./dist/`          |
| `pnpm preview`                      | Preview your build locally, before deploying     |
| `pnpm new-post <filename>`          | Create a new post                                |
| `pnpm astro ...`                    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`                 | Get help using the Astro CLI                     |


