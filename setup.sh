#!/bin/bash
# DayControl - Installation & Setup Script
# Usage: bash setup.sh

echo "🚀 DayControl - Setup Script"
echo "================================"
echo ""

# Check Node.js
echo "📌 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"
echo ""

# Check npm
echo "📌 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi
echo "✅ npm found: $(npm --version)"
echo ""

# Check Expo CLI
echo "📌 Checking Expo CLI..."
if ! command -v expo &> /dev/null; then
    echo "⚠️  Expo CLI not found. Installing..."
    npm install -g expo-cli
else
    echo "✅ Expo CLI found: $(expo --version)"
fi
echo ""

# Clear node_modules if requested
if [ "$1" == "--clean" ]; then
    echo "🧹 Cleaning node_modules..."
    rm -rf node_modules package-lock.json
fi

# Install dependencies
echo "📌 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Check environment
if [ ! -f .env ]; then
    echo "📌 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your Google Client ID"
    echo "   Edit: .env and add your GOOGLE_CLIENT_ID"
fi
echo ""

# Ready message
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update your Google Client ID in .env"
echo "2. Run: npm start"
echo "3. Choose platform:"
echo "   - Press 'a' for Android"
echo "   - Press 'i' for iOS (Mac only)"
echo "   - Press 'w' for Web"
echo ""
echo "Or run directly:"
echo "   npm run android    (Android emulator)"
echo "   npm run web        (Web browser)"
echo ""
echo "For detailed setup, see: SETUP_GUIDE.md"
echo "For quick start, see: QUICKSTART.md"
echo ""
