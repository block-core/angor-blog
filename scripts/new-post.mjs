#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'ar', 'fa', 'fr'];

// Language-specific configurations
const LANGUAGE_CONFIG = {
  en: {
    direction: 'ltr',
    name: 'English'
  },
  ar: {
    direction: 'rtl',
    name: 'العربية'
  },
  fa: {
    direction: 'rtl',
    name: 'فارسی'
  },
  fr: {
    direction: 'ltr',
    name: 'Français'
  }
};

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
}

function formatDate(date) {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function createFrontmatter(title, language) {
  const today = new Date();
  const formattedDate = formatDate(today);
  
  return `---
title: "${title}"
description: ""
author: ''
role: ''
authorImage: ""
authorImageAlt: ""
pubDate: ${formattedDate}
cardImage: ""
cardImageAlt: ""
readTime: 
tags: ['']
nostrPublicKey: ''
---

## Main Content

Write your blog post content here...
`;
}

function createPost(language, title) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    console.error(`❌ Error: Language '${language}' is not supported.`);
    console.log(`Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
    process.exit(1);
  }

  const slug = createSlug(title);
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog', language);
  const postDir = path.join(blogDir, slug);
  const indexFile = path.join(postDir, 'index.md');

  // Check if the blog directory exists
  if (!fs.existsSync(blogDir)) {
    console.error(`❌ Error: Blog directory for language '${language}' does not exist: ${blogDir}`);
    process.exit(1);
  }

  // Check if post directory already exists
  if (fs.existsSync(postDir)) {
    console.error(`❌ Error: Post directory already exists: ${postDir}`);
    console.log(`A post with the slug '${slug}' already exists for language '${language}'.`);
    process.exit(1);
  }

  try {
    // Create post directory
    fs.mkdirSync(postDir, { recursive: true });
    
    // Create index.md file with frontmatter
    const content = createFrontmatter(title, language);
    fs.writeFileSync(indexFile, content, 'utf8');

    console.log(`✅ Successfully created new post:`);
    console.log(`   Language: ${LANGUAGE_CONFIG[language].name} (${language})`);
    console.log(`   Title: ${title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Path: ${postDir}`);
    console.log(`   File: ${indexFile}`);
    
  } catch (error) {
    console.error(`❌ Error creating post: ${error.message}`);
    process.exit(1);
  }
}

function createPostForAllLanguages(title) {
  console.log(`🌐 Creating post "${title}" for all languages...\n`);
  
  for (const language of SUPPORTED_LANGUAGES) {
    try {
      createPost(language, title);
      console.log(''); // Empty line for better readability
    } catch (error) {
      console.error(`Failed to create post for language '${language}': ${error.message}`);
    }
  }
}

function showHelp() {
  console.log(`
📝 Angor Blog - New Post Generator

Usage:
  npm run new-post <language> "<title>"     Create post for specific language
  npm run new-post all "<title>"            Create post for all languages

Arguments:
  <language>    Language code (${SUPPORTED_LANGUAGES.join(', ')}) or 'all'
  <title>       Post title (use quotes if it contains spaces)

Examples:
  npm run new-post en "My New Blog Post"
  npm run new-post fa "پست جدید من"
  npm run new-post all "Global Announcement"

Supported Languages:
${SUPPORTED_LANGUAGES.map(lang => `  • ${lang} - ${LANGUAGE_CONFIG[lang].name}`).join('\n')}
`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Error: Missing required arguments');
  showHelp();
  process.exit(1);
}

const [language, title] = args;

if (!title || title.trim() === '') {
  console.error('❌ Error: Title cannot be empty');
  showHelp();
  process.exit(1);
}

if (language === 'all') {
  createPostForAllLanguages(title.trim());
} else {
  createPost(language, title.trim());
}
