---
title: Simple Guides for Blog Post
published: 2024-05-01
description: "How to Contribute to the Angor Blog: Utilizing Our Posting Guide"
image: "./cover.jpg"
tags: ["Angor", "Blogging"]
category: Guides
draft: false
---

> Cover image source: [Source](./cover.jpg)

## Front-matter of Posts

```yaml
---
title: Simple Guides for Blog Post
published: 2024-05-01
description: "How to Contribute to the Angor Blog: Utilizing Our Posting Guide"
image: ./cover.jpg
tags: [Angor, Blogging]
category: Guides
draft: false
---
```

| Attribute     | Description                                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | The title of the post.                                                                                                                                                                                      |
| `published`   | The date the post was published.                                                                                                                                                                            |
| `description` | A short description of the post. Displayed on index page.                                                                                                                                                   |
| `image`       | The cover image path of the post.<br/>1. Start with `http://` or `https://`: Use web image<br/>2. Start with `/`: For image in `public` dir<br/>3. With none of the prefixes: Relative to the markdown file |
| `tags`        | The tags of the post.                                                                                                                                                                                       |
| `category`    | The category of the post.                                                                                                                                                                                   |
| `draft`        | If this post is still a draft, which won't be displayed.                                                                                                                                                    |

## Where to Place the Post Files



Your post files should be placed in `src/content/posts/` directory. You can also create sub-directories to better organize your posts and assets.

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```