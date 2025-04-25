/**
 * Server Check Utility
 * 
 * This script performs basic checks to help diagnose server issues.
 * Run with: node server-check.js
 */

const fs = require('fs');
const path = require('path');

console.log('===== Math Adventure Server Check =====');
console.log(`System: ${process.platform}`);
console.log(`Node.js: ${process.version}`);
console.log(`Current Directory: ${process.cwd()}`);

// Check for required files
const requiredFiles = [
  'server.js',
  'package.json',
  'index.html',
  'style.css',
  'script.js'
];

console.log('\nChecking required files...');
let allFilesPresent = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} found`);
  } else {
    console.log(`✗ ${file} missing!`);
    allFilesPresent = false;
  }
});

// Check server.js syntax
console.log('\nValidating server.js syntax...');
try {
  require('./server');
  console.log('✓ server.js syntax is valid');
} catch (error) {
  console.log('✗ server.js has syntax errors:');
  console.log(error.message);
}

// Check for node_modules
console.log('\nChecking for installed dependencies...');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✓ node_modules found');
  
  // Check for express
  const expressPath = path.join(nodeModulesPath, 'express');
  if (fs.existsSync(expressPath)) {
    console.log('✓ express module found');
  } else {
    console.log('✗ express module missing! Run npm install');
  }
} else {
  console.log('✗ node_modules missing! Run npm install');
}

console.log('\n===== Check Complete =====');
if (allFilesPresent) {
  console.log('All required files are present.');
  console.log('\nTo start the server, run:');
  console.log('npm start');
} else {
  console.log('Some required files are missing. Please check above for details.');
}
