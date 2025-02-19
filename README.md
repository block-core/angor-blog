# ✨ Welcome to the Angor Blog

## 🚀 Getting Started

### 1. Clone the Repository

To begin, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/your-repo/angor-blog.git
cd angor-blog
```

### 2. Install Dependencies

Next, install the necessary dependencies:

```bash
pnpm install
pnpm add sharp
```

If `pnpm` is not already installed, you can install it globally using:

```bash
npm install -g pnpm
```

## 🧞 Available Commands

All commands should be executed from the root directory of the project using a terminal:

| Command                             | Description                                       |
|:------------------------------------|:--------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | Install project dependencies                      |
| `pnpm dev`                          | Start the local development server at `localhost:4321` |
| `pnpm build`                        | Build the production site into the `./dist/` directory |
| `pnpm preview`                      | Preview the built site locally before deploying   |
| `pnpm new-post <foldername>`        | Create a new blog post                            |
| `pnpm astro ...`                    | Execute Astro CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`                 | Display help information for the Astro CLI        |

## ✍️ Creating a New Post

### 1. Create Post Structure

Run the following command to create a new post:

```bash
pnpm new-post my-awesome-post
```

This will create:

```
src/content/posts/
└── my-awesome-post/
    ├── index.md
    └── images/
```

### 2. Configure Post Metadata

Edit the frontmatter in `index.md`:

```yaml
---
title: "My Awesome Post"     # The title that appears at the top of your post
published: 2024-02-19       # Publication date (auto-filled)
description: "A detailed introduction to blockchain technology"  # Brief description
image: "./images/cover.jpg" # Post cover image (relative path)
tags: ["Blockchain", "Technology", "Crypto"]  # Related topics
category: "Technology"      # Main category
draft: false               # Set to true to hide from production
lang: "en"                # Language code (en, fa, etc)
---
```

### 3. Add Images

1. Place your post images in the `images` folder
2. Reference them in your markdown using relative paths:

```markdown
![Image description](./images/example.jpg)
```

### 4. Write Content

Below the frontmatter, write your post content using Markdown:

```markdown
## Introduction

This is a paragraph with **bold** and *italic* text.

### Code Examples
​```javascript
console.log("Hello World!");
​```

### Lists
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2

### Links
[Visit our website](https://example.com)

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### 5. Preview Your Post

1. Run the development server:

```bash
pnpm dev
```

2. Open `http://localhost:4321` in your browser
3. Navigate to your new post

### 6. Publishing

1. Set `draft: false` in the frontmatter
2. Build the site:

```bash
pnpm build
```

### 7. Post Organization Tips

- Keep image files under 1MB when possible
- Use descriptive image filenames
- Organize content with clear headings (H2, H3, etc.)
- Add relevant tags for better discoverability
- Include a meaningful description for SEO

## ⚙️ Frontmatter of Posts

Each post file (`index.md`) should start with frontmatter in YAML format. Here is an example:

```yaml
---
title: My First Blog Post
published: 2024-05-08
description: This is the first post.
image: /images/cover.jpg
tags: [Bitcoin, Investment, Angor]
category: Cryptocurrency
draft: false
---
```

### Frontmatter Fields Explained

- `title`: The title of your blog post.
- `published`: The date when the post is published.
- `description`: A brief description of the post.
- `image`: Path to the cover image of the post.
- `tags`: An array of tags relevant to the post.
- `category`: The category under which the post falls.
- `draft`: Set to `false` when the post is ready to be published.
