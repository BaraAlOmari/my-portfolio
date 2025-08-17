#!/bin/bash

# Portfolio AI Assistant Startup Script
echo "🚀 Starting Bara's Portfolio with AI Assistant..."
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "📋 Creating .env from .env.example..."
    cp .env.example .env
    echo ""
    echo "🔑 IMPORTANT: Please edit the .env file and add your OpenAI API key!"
    echo "   Get your API key from: https://platform.openai.com/"
    echo "   Then replace 'your_openai_api_key_here' with your actual key."
    echo ""
    read -p "Press Enter after you've added your API key to continue..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🎯 Starting development server..."
echo "📱 Your portfolio will be available at: http://localhost:3000"
echo "🤖 The AI chat assistant will be ready to answer questions!"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev