#!/bin/bash

# Pokemon App Development Script
# This script provides easy commands to run the development environment

echo "🚀 Pokemon App Development Script"
echo "=================================="

case "$1" in
  "dev"|"start")
    echo "Starting both client and API concurrently..."
    yarn dev
    ;;
  "api")
    echo "Starting API only..."
    yarn dev:api
    ;;
  "client")
    echo "Starting client only..."
    yarn dev:client
    ;;
  "build")
    echo "Building both client and API..."
    yarn build
    ;;
  "test")
    echo "Running tests..."
    yarn test
    ;;
  "clean")
    echo "Cleaning build artifacts..."
    yarn clean
    ;;
  "install")
    echo "Installing all dependencies..."
    yarn install:all
    ;;
  *)
    echo "Usage: ./scripts/dev.sh [command]"
    echo ""
    echo "Available commands:"
    echo "  dev, start  - Run both client and API concurrently"
    echo "  api         - Run API only"
    echo "  client      - Run client only"
    echo "  build       - Build both client and API"
    echo "  test        - Run tests"
    echo "  clean       - Clean build artifacts"
    echo "  install     - Install all dependencies"
    echo ""
    echo "Examples:"
    echo "  ./scripts/dev.sh dev      # Start both servers"
    echo "  ./scripts/dev.sh api      # Start API only"
    echo "  ./scripts/dev.sh client   # Start client only"
    ;;
esac
