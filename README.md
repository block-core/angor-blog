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

Follow these steps to create a new post using the provided script:

### 1. Open Terminal or Command Prompt
Navigate to the root directory of the project.

### 2. Run the Script
Execute the following command, replacing `<foldername>` with the desired name for your post folder:
```bash
pnpm new-post <foldername>
```
For example, to name your post folder "what-is-angor", use:
```bash
pnpm new-post what-is-angor
```
This command will:
- Format the folder name to lowercase with hyphens.
- Create a directory with this name in `src/content/posts/`.
- Generate an `index.md` file within that directory containing initial post metadata.

### 3. Edit the `index.md` File
Open the newly created `index.md` file and start writing your post. Customize the frontmatter and add your content as needed.

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
