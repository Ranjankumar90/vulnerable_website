#!/bin/bash

echo "🔓 Deploying VulnBlog - Vulnerable Web Application"
echo "⚠️  WARNING: This is a deliberately vulnerable application for educational purposes only!"
echo ""

# Build the project
echo "📦 Building the project..."
cd project
npm install
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "🌐 To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'gh-pages' branch"
echo "5. Your site will be available at: https://ranjankumar90.github.io/vulnerable_website/"
echo ""
echo "🚀 For local testing, run: npm run dev"
echo "📁 Built files are in: project/dist/"
