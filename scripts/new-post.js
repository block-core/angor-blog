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
  console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`)
  process.exit(1) // Terminate the script and return error code 1
}

// Convert filename to lowercase and replace spaces with hyphens
let folderName = args[0].toLowerCase().replace(/\s+/g, '-')

const targetDir = "./src/content/posts/"
const postDir = path.join(targetDir, folderName)

// Create the directory if it doesn't exist
if (fs.existsSync(postDir)) {
  console.error(`Error: Folder ${postDir} already exists`)
  process.exit(1)
}

fs.mkdirSync(postDir, { recursive: true })

const content = `---
title: ${args[0]}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`

const indexPath = path.join(postDir, 'index.md')
fs.writeFileSync(indexPath, content)

console.log(`Post created at ${indexPath}`)
