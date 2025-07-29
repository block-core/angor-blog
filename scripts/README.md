# New Post Generator

This script is designed to create new articles for the multilingual Angor blog.

## Usage

### Create Post for Specific Language

```bash
npm run new-post <language> "<title>"
```

Examples:
```bash
npm run new-post en "My New Blog Post"
npm run new-post fa "پست جدید من"
npm run new-post ar "منشوري الجديد"
npm run new-post fr "Mon Nouveau Article"
```

### Create Post for All Languages

```bash
npm run new-post all "<title>"
```

Example:
```bash
npm run new-post all "Global Announcement"
```

## Supported Languages

- `en` - English
- `ar` - العربية (Arabic)
- `fa` - فارسی (Persian/Farsi)
- `fr` - Français (French)

## Generated Structure

The script performs the following actions:

1. Creates a new folder with a slug name (based on the title) in `src/content/blog/<language>/`
2. Creates an `index.md` file inside that folder
3. Populates the file with appropriate frontmatter and today's date

## Output Example

For the command:
```bash
npm run new-post en "How to Use Angor Protocol"
```

The following structure is created:
```
src/content/blog/en/how-to-use-angor-protocol/
└── index.md
```

With content:
```markdown
---
title: "How to Use Angor Protocol"
description: ""
author: ''
role: ''
authorImage: ""
authorImageAlt: ""
pubDate: 2025-07-29
cardImage: ""
cardImageAlt: ""
readTime: 
tags: ['']
nostrPublicKey: ''
---

## Main Content

Write your blog post content here...
```

## Error Handling

- If an unsupported language is used, an error will be displayed
- If a folder with the same name already exists, an error will be displayed
- If the title is empty, an error will be displayed

## Help

To view the complete help guide:
```bash
npm run new-post
```
