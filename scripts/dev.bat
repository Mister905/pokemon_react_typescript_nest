@echo off
REM Pokemon App Development Script for Windows
REM This script provides easy commands to run the development environment

echo 🚀 Pokemon App Development Script
echo ==================================

if "%1"=="dev" goto dev
if "%1"=="start" goto dev
if "%1"=="api" goto api
if "%1"=="client" goto client
if "%1"=="build" goto build
if "%1"=="test" goto test
if "%1"=="clean" goto clean
if "%1"=="install" goto install
goto usage

:dev
echo Starting both client and API concurrently...
yarn dev
goto end

:api
echo Starting API only...
yarn dev:api
goto end

:client
echo Starting client only...
yarn dev:client
goto end

:build
echo Building both client and API...
yarn build
goto end

:test
echo Running tests...
yarn test
goto end

:clean
echo Cleaning build artifacts...
yarn clean
goto end

:install
echo Installing all dependencies...
yarn install:all
goto end

:usage
echo Usage: scripts\dev.bat [command]
echo.
echo Available commands:
echo   dev, start  - Run both client and API concurrently
echo   api         - Run API only
echo   client      - Run client only
echo   build       - Build both client and API
echo   test        - Run tests
echo   clean       - Clean build artifacts
echo   install     - Install all dependencies
echo.
echo Examples:
echo   scripts\dev.bat dev      # Start both servers
echo   scripts\dev.bat api      # Start API only
echo   scripts\dev.bat client   # Start client only

:end
pause
