/* This is a script to create a new post markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

// Add new function to convert title to slug
function titleToSlug(title) {
  return title
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9]+/g, '-') // replace spaces and special chars with hyphens
    .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
}

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No folder name argument provided
Usage: npm run new-post -- <foldername>`)
  process.exit(1)
}

const originalTitle = args[0]
const folderName = titleToSlug(originalTitle)

// Use absolute path resolution
const rootDir = path.resolve(process.cwd())
const targetDir = path.join(rootDir, "src", "content", "posts")
const postDir = path.join(targetDir, folderName)

// Check if posts directory exists, if not create it
if (!fs.existsSync(targetDir)) {
  try {
    fs.mkdirSync(targetDir, { recursive: true })
  } catch (error) {
    console.error(`Error creating posts directory: ${error.message}`)
    process.exit(1)
  }
}

// Check if folder already exists
if (fs.existsSync(postDir)) {
  console.error(`Error: Folder "${folderName}" already exists in posts directory.`)
  process.exit(1)
}

try {
  fs.mkdirSync(postDir)
  console.log(`Created directory: ${postDir}`)
} catch (error) {
  console.error(`Error creating post directory: ${error.message}`)
  process.exit(1)
}

// Get date string for frontmatter
const dateStr = getDate()

// Create frontmatter for the new post
const frontmatter = `---
title: ${originalTitle}
description: ''
published: ${dateStr}
tags: []
category: ''
image: ''
author: 'Angor'
nostrPubKey: 'npub1wrzguj625auyeysfuuxzf7ywhzlwfz9gm3fml2lul72gwqxw8n9swtcm02'
---

Content goes here...
`

// Write the markdown file
const mdFilePath = path.join(postDir, "index.md")
try {
  fs.writeFileSync(mdFilePath, frontmatter)
  console.log(`Created file: ${mdFilePath}`)
  console.log("Post created successfully!")
} catch (error) {
  console.error(`Error writing markdown file: ${error.message}`)
  process.exit(1)
}
