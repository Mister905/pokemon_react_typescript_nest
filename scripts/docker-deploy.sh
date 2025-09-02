#!/bin/bash

echo "🐳 Deploying Pokemon App with Docker..."

# Build and start services
echo "📦 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "🔍 Checking service status..."
docker-compose ps

echo "📋 Service URLs:"
echo "  Frontend: http://localhost:5173"
echo "  API: http://localhost:3000"
echo "  Nginx (if enabled): http://localhost:80"

echo "✅ Deployment complete!"
echo "📊 View logs with: docker-compose logs -f"
echo "🛑 Stop services with: docker-compose down"
