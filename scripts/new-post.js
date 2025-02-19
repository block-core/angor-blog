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

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error(`Error: No folder name argument provided
Usage: npm run new-post -- <foldername>`)
  process.exit(1)
}

const folderName = args[0]
const targetDir = "./src/content/posts/"
const postDir = path.join(targetDir, folderName)
const imagesDir = path.join(postDir, "images")

// Check if folder already exists
if (fs.existsSync(postDir)) {
  console.error(`Error: Folder ${postDir} already exists`)
  process.exit(1)
}

// Create post folder and images subfolder
fs.mkdirSync(postDir, { recursive: true })
fs.mkdirSync(imagesDir)

const content = `---
title: ${folderName}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`

// Create index.md file
fs.writeFileSync(path.join(postDir, "index.md"), content)

console.log(`Post folder created at ${postDir}`)
console.log(`Images folder created at ${imagesDir}`)
console.log(`Index file created at ${path.join(postDir, "index.md")}`)
