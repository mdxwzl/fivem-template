const fs = require('fs');
const { execSync } = require('child_process');

try {
    execSync('npx tsc');
} catch (error) {
    console.error('TypeScript compilation failed:', error);
    process.exit(1);
}

const jsFilePath = 'dist/index.js';
const shebang = '#!/usr/bin/env node\n';
const jsContent = fs.readFileSync(jsFilePath, 'utf8');
fs.writeFileSync(jsFilePath, shebang + jsContent, 'utf8');

console.log('Build successful!');
