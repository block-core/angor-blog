# Contributing to Angor Blog

Welcome to the Angor Blog! This guide will walk you through everything you need to know about creating and submitting blog posts for the Angor platform.

## Table of Contents

- [Getting Started](#getting-started)
- [Blog Structure](#blog-structure)
- [Creating New Posts](#creating-new-posts)
- [Post Format and Guidelines](#post-format-and-guidelines)
- [Frontmatter Reference](#frontmatter-reference)
- [Writing Guidelines](#writing-guidelines)
- [Images and Assets](#images-and-assets)
- [Multilingual Support](#multilingual-support)
- [Testing Your Post](#testing-your-post)
- [Submission Process](#submission-process)
- [Best Practices](#best-practices)

## Getting Started

### Prerequisites

Before you start contributing, make sure you have:

- Node.js (version 18 or higher)
- Git
- A text editor (VS Code recommended)
- Basic knowledge of Markdown

### Setting Up the Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/block-core/angor-blog.git
   cd angor-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4321` to see the blog locally.

## Blog Structure

The Angor blog supports four languages and follows this structure:

```
src/content/blog/
├── en/          # English posts
├── ar/          # Arabic posts
├── fa/          # Persian/Farsi posts
└── fr/          # French posts
```

Each post is organized in its own directory with an `index.md` file:

```
src/content/blog/en/my-post-title/
└── index.md
```

## Creating New Posts

We've created a convenient script to help you create new posts quickly.

### Using the New Post Script

**For a single language:**
```bash
npm run new-post en "Your Post Title"
npm run new-post fa "عنوان پست شما"
npm run new-post ar "عنوان منشورك"
npm run new-post fr "Titre de votre article"
```

**For all languages at once:**
```bash
npm run new-post all "Your Post Title"
```

### Manual Creation

If you prefer to create posts manually:

1. Navigate to the appropriate language directory
2. Create a new folder with your post slug (lowercase, hyphen-separated)
3. Create an `index.md` file inside the folder
4. Add the required frontmatter and content

## Post Format and Guidelines

### File Structure

Each post must be in its own directory with an `index.md` file:

```
src/content/blog/en/understanding-angor-protocol/
└── index.md
```

### Slug Guidelines

- Use lowercase letters only
- Separate words with hyphens (-)
- Keep it concise but descriptive
- Avoid special characters or numbers unless necessary

**Good examples:**
- `understanding-angor-protocol`
- `bitcoin-and-decentralized-funding`
- `how-to-invest-safely`

**Bad examples:**
- `Understanding_Angor_Protocol`
- `bitcoin&decentralized-funding`
- `how to invest safely`

## Frontmatter Reference

Every post must start with YAML frontmatter containing metadata:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post (150-160 characters recommended)"
author: 'Your Name'
role: 'Your Role/Title'
authorImage: "@/images/authors/your-photo.jpg"
authorImageAlt: "Your Name"
pubDate: 2025-07-29
cardImage: "@/images/your-post-image.webp"
cardImageAlt: "Descriptive alt text for your image"
readTime: 8
tags: ['Angor', 'Bitcoin', 'Crowdfunding', 'Protocol']
nostrPublicKey: 'npub1...'
---
```

### Frontmatter Fields Explained

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | The title of your post (will appear in search results and social media) |
| `description` | ✅ | SEO description (150-160 characters recommended) |
| `author` | ✅ | Your full name |
| `role` | ✅ | Your role or title (e.g., "Angor Developer", "Community Manager") |
| `authorImage` | ❌ | Path to your profile image (optional but recommended) |
| `authorImageAlt` | ❌ | Alt text for your profile image |
| `pubDate` | ✅ | Publication date in YYYY-MM-DD format |
| `cardImage` | ✅ | Featured image for the post (appears in listings and social media) |
| `cardImageAlt` | ✅ | Alt text for the featured image |
| `readTime` | ✅ | Estimated reading time in minutes |
| `tags` | ✅ | Array of relevant tags for categorization |
| `nostrPublicKey` | ❌ | Your Nostr public key (npub format) |

### Tag Guidelines

Use relevant, specific tags. Common tags include:
- `Angor` (for posts about the platform)
- `Bitcoin` (for Bitcoin-related content)
- `Protocol` (for technical protocol discussions)
- `Crowdfunding` (for funding-related topics)
- `Tutorial` (for how-to guides)
- `News` (for announcements)
- `Community` (for community-related posts)

## Writing Guidelines

### Content Structure

1. **Start with a compelling introduction** that hooks the reader
2. **Use clear headings** (H2 and H3) to structure your content
3. **Include practical examples** when explaining concepts
4. **End with a conclusion** or call-to-action

### Writing Style

- **Be clear and concise**: Avoid jargon unless necessary
- **Use active voice**: Makes your writing more engaging
- **Include examples**: Real-world examples help readers understand
- **Stay focused**: Each post should have a clear purpose
- **Be authentic**: Write in a conversational tone when appropriate

### Markdown Best Practices

**Headings:**
```markdown
## Main Section (H2)
### Subsection (H3)
#### Details (H4)
```

**Lists:**
```markdown
- Use bullet points for unordered lists
- Keep items parallel in structure

1. Use numbers for sequential steps
2. Each item should be clear and actionable
```

**Code blocks:**
```markdown
Use `inline code` for short snippets.

```javascript
// Use code blocks for longer examples
function example() {
  return "Hello, Angor!";
}
```
```

**Links:**
```markdown
[Link text](https://example.com)
[Internal link](/blog/another-post)
```

**Emphasis:**
```markdown
*Italic text* or _italic text_
**Bold text** or __bold text__
```

## Images and Assets

### Image Guidelines

1. **Optimize images** before adding them to the repository
2. **Use WebP format** when possible for better performance
3. **Provide alt text** for accessibility
4. **Keep file sizes reasonable** (under 500KB recommended)

### Adding Images

1. **Place images in the appropriate directory:**
   ```
   src/images/
   ├── your-post-image.webp
   └── authors/
       └── your-photo.jpg
   ```

2. **Reference images in your post:**
   ```markdown
   ![Alt text](@/images/your-post-image.webp)
   ```

3. **In frontmatter:**
   ```yaml
   cardImage: "@/images/your-post-image.webp"
   authorImage: "@/images/authors/your-photo.jpg"
   ```

### Image Specifications

- **Featured image (cardImage)**: 1200x630px recommended
- **Author photo**: 400x400px recommended
- **In-content images**: Responsive, max width 800px
- **Format**: WebP preferred, PNG/JPG acceptable

## Multilingual Support

The Angor blog supports four languages:

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR |
| Arabic | `ar` | RTL |
| Persian/Farsi | `fa` | RTL |
| French | `fr` | LTR |

### Translation Guidelines

1. **Start with English**: Create the English version first
2. **Maintain consistency**: Keep the same structure across languages
3. **Adapt content culturally**: Consider cultural context for each language
4. **Use native speakers**: Get translations reviewed by native speakers when possible

### Creating Multilingual Posts

**Option 1: Use the script for all languages**
```bash
npm run new-post all "Your Post Title"
```

**Option 2: Create individual language versions**
```bash
npm run new-post en "Your Post Title"
npm run new-post fa "عنوان پست شما"
npm run new-post ar "عنوان منشورك"
npm run new-post fr "Titre de votre article"
```

## Testing Your Post

### Local Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to your post:**
   - English: `http://localhost:4321/blog/your-post-slug`
   - Persian: `http://localhost:4321/fa/blog/your-post-slug`
   - Arabic: `http://localhost:4321/ar/blog/your-post-slug`
   - French: `http://localhost:4321/fr/blog/your-post-slug`

3. **Check for:**
   - Proper formatting
   - Working images
   - Correct metadata
   - Responsive design
   - Reading time accuracy

### Build Testing

Before submitting, test the production build:

```bash
npm run build
npm run preview
```

## Submission Process

### Using Git

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-post-name
   ```

2. **Add your files:**
   ```bash
   git add .
   git commit -m "Add: New blog post about [topic]"
   ```

3. **Push your branch:**
   ```bash
   git push origin feature/your-post-name
   ```

4. **Create a Pull Request:**
   - Go to the GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

### Pull Request Guidelines

**Title format:**
```
Add: [Post Title] blog post
```

**Description should include:**
- Brief summary of the post
- Target audience
- Any special considerations
- Screenshots (if applicable)

## Best Practices

### Content Quality

1. **Research thoroughly**: Ensure accuracy of technical information
2. **Cite sources**: Link to relevant resources and documentation
3. **Update regularly**: Keep information current
4. **Proofread**: Check for grammar, spelling, and formatting errors

### SEO Optimization

1. **Use descriptive titles**: Include relevant keywords naturally
2. **Write compelling descriptions**: Encourage clicks from search results
3. **Use proper headings**: Structure content with H2, H3 tags
4. **Include internal links**: Link to other relevant blog posts
5. **Optimize images**: Use descriptive filenames and alt text

### Performance

1. **Optimize images**: Compress and use appropriate formats
2. **Keep posts focused**: Long posts should be broken into series
3. **Use lazy loading**: Images load as needed
4. **Test loading speed**: Ensure fast page loads

### Accessibility

1. **Use semantic HTML**: Proper heading structure
2. **Provide alt text**: Describe images for screen readers
3. **Ensure contrast**: Text should be readable
4. **Test with screen readers**: Verify accessibility

### Community Guidelines

1. **Be respectful**: Maintain a professional tone
2. **Stay on topic**: Focus on Angor, Bitcoin, and related technologies
3. **Encourage discussion**: End posts with questions or calls-to-action
4. **Respond to feedback**: Engage with community comments

## Common Issues and Solutions

### Issue: Images not loading

**Solution:**
- Check file paths are correct
- Ensure images are in the `src/images/` directory
- Verify image format is supported (WebP, PNG, JPG)

### Issue: Frontmatter errors

**Solution:**
- Validate YAML syntax
- Ensure all required fields are present
- Check date format is YYYY-MM-DD

### Issue: Build failures

**Solution:**
- Run `npm run type-check` to find TypeScript errors
- Check for syntax errors in Markdown
- Verify all links are working

### Issue: Styling problems

**Solution:**
- Test in development mode first
- Check for conflicting CSS
- Ensure responsive design works

## Getting Help

If you need assistance:

1. **Check existing documentation** in this repository
2. **Review similar posts** for examples
3. **Ask in community channels** (Discord, Telegram)
4. **Create an issue** on GitHub for technical problems
5. **Contact the maintainers** directly

## Resources

- [Astro Documentation](https://docs.astro.build/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Angor Protocol Documentation](https://docs.angor.io/)
- [Nostr Protocol](https://nostr.com/)

---

## Quick Start Checklist

- [ ] Repository cloned and dependencies installed
- [ ] Development server running (`npm run dev`)
- [ ] New post created using script or manually
- [ ] Frontmatter completed with all required fields
- [ ] Content written following guidelines
- [ ] Images optimized and properly referenced
- [ ] Post tested locally
- [ ] Changes committed to feature branch
- [ ] Pull request created with proper description

Thank you for contributing to the Angor Blog! Your insights and expertise help build a stronger, more informed community around decentralized crowdfunding and Bitcoin innovation.
