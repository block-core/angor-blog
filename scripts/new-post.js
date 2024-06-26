/* This is a script to create a new post markdown file with front-matter */

import fs from 'fs';
import path from 'path';

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Error: No filename argument provided\nUsage: npm run new-post -- <filename>');
  process.exit(1); // Terminate the script and return error code 1
}

// Join all arguments to form the filename, replace spaces with hyphens, and sanitize input
let fileName = args.join(' ').toLowerCase(); // Join all arguments and convert to lowercase
fileName = fileName.replace(/\s+/g, '-'); // Replace spaces with hyphens
fileName = fileName.replace(/[^a-z0-9\-]/g, ''); // Remove characters that are not a-z, 0-9, or hyphen

const targetDir = './src/content/posts/';
const directoryPath = path.join(targetDir, fileName);
const fullPath = path.join(directoryPath, 'index.md');

if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true }); // Create the directory if it does not exist
}

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists`);
  process.exit(1);
}

const content = `---
title: ${args.join(' ')}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
---
`;

fs.writeFileSync(fullPath, content);

console.log(`Post ${fullPath} created`);
