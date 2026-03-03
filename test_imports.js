const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('import { useThemeContext } from "../context/ThemeContext"')) {
    console.log(`Checking ${filePath}`);
    try {
      require(filePath);
    } catch(e) {
      console.log(`Error parsing ${filePath}: ${e.message}`);
    }
  }
}

// Simple syntax check
const { execSync } = require('child_process');
try {
  execSync('npx eslint components/ screens/');
  console.log('ESLint passed');
} catch (e) {
  console.log('Syntax errors found by ESLint:');
  console.log(e.stdout.toString());
}
