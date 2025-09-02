# Pokemon React TypeScript NestJS Application

A full-stack Pokemon application built with React TypeScript frontend and NestJS backend, fully containerized with Docker for easy deployment.

## 🌐 **LIVE APPLICATION**

**The application is currently deployed and accessible at:**

- **Frontend**: http://44.222.182.174:5173
- **API**: http://44.222.182.174:3000

**Status**: ✅ **LIVE AND FUNCTIONAL** - All images and features working correctly

### 🎯 **Quick Access**
- **Main App**: [http://44.222.182.174:5173](http://44.222.182.174:5173) - Pokemon application with authentication, favourites, and notes
- **API Endpoints**: [http://44.222.182.174:3000/api](http://44.222.182.174:3000/api) - REST API for authentication and data management

### 🔧 **Server Access**
- **SSH Command**: `ssh -i pokemon-app-key-aws.pem ec2-user@44.222.182.174`
- **Instance Type**: AWS EC2 t2.micro (Amazon Linux 2)
- **Location**: `/home/ec2-user/pokemon-app/`
- **Key File**: `pokemon-app-key-aws.pem` (ensure proper permissions: `chmod 400 pokemon-app-key-aws.pem`)

#### **Docker Container Management**
```bash
# Check running containers
docker ps

# Check container logs
docker logs pokemon-client
docker logs pokemon-api

# Restart services
docker restart pokemon-client pokemon-api

# Rebuild and redeploy
cd /home/ec2-user/pokemon-app
docker stop pokemon-client pokemon-api
docker rm pokemon-client pokemon-api
cd client && docker build --no-cache -t pokemon-client .
cd ../api && docker build --no-cache -t pokemon-api .
cd .. && docker run -d --name pokemon-api -p 3000:3000 -e NODE_ENV=production pokemon-api
docker run -d --name pokemon-client -p 5173:80 pokemon-client
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (recommended)
- Node.js >= 18.0.0 (for local development)
- Yarn >= 1.22.0

### Docker Development (Recommended)
```bash
# Start the entire application with Docker
docker-compose up --build

# Or use the deployment script
./scripts/docker-deploy.sh
```

This will start:
- **API**: NestJS backend on `http://localhost:3000`
- **Client**: React frontend on `http://localhost:5173`

### Local Development (Alternative)
```bash
# Install all dependencies (root, client, and API)
yarn install:all

# Run both client and API concurrently
yarn dev
```

**Or use the convenience script:**
```bash
# On macOS/Linux
./scripts/dev.sh dev

# On Windows
scripts\dev.bat dev
```

## 📁 Project Structure

```
pokemon_react_typescript_nest/
├── docker-compose.yml              # Development orchestration
├── docker-compose.prod.yml         # Production configuration
├── .dockerignore                   # Docker context exclusions
├── .gitignore                      # Git exclusions (includes SSH keys)
├── api/                            # NestJS Backend
│   ├── Dockerfile                  # Backend container (Node.js 18)
│   ├── .dockerignore
│   ├── src/
│   │   ├── features/               # Feature modules (auth, users, favourites, notes)
│   │   ├── main.ts                 # Application entry point
│   │   └── prisma/                 # Database schema and migrations
│   ├── package.json                # Backend dependencies
│   └── yarn.lock
├── client/                         # React TypeScript Frontend
│   ├── Dockerfile                  # Frontend container (Node.js 18 + Nginx)
│   ├── .dockerignore
│   ├── nginx.conf                  # Nginx configuration for serving
│   ├── src/
│   │   ├── components/             # React components with dedicated SCSS files
│   │   ├── features/               # Redux slices (pokemon, loading, auth)
│   │   ├── store/                  # Redux store configuration
│   │   ├── hooks/                  # Custom hooks (useAuth, useMaterializeInit, etc.)
│   │   ├── scss/                   # Global styles and component imports
│   │   └── main.tsx                # React entry point
│   ├── package.json                # Frontend dependencies
│   └── yarn.lock
├── nginx/                          # Reverse proxy configuration
│   ├── nginx.conf
│   └── default.conf
├── scripts/
│   ├── docker-deploy.sh            # Automated deployment script
│   └── dev.sh                      # Development scripts
└── package.json                    # Root package.json with concurrent scripts
```

## 📦 Installation Commands

### Root Dependencies
```bash
# Install concurrently for running multiple scripts
yarn add -D concurrently
```

### API Dependencies (NestJS Backend)
```bash
# Core NestJS dependencies
yarn add @nestjs/common @nestjs/core @nestjs/platform-express
yarn add -D @nestjs/cli @nestjs/schematics @nestjs/testing

# Database and ORM
yarn add @prisma/client prisma sqlite3
yarn add -D prisma

# Authentication and Security
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
yarn add -D @types/passport-jwt @types/passport-local @types/bcrypt

# Validation and Transformation
yarn add class-validator class-transformer

# HTTP Client
yarn add axios

# Configuration
yarn add @nestjs/config

# Development Dependencies
yarn add -D @types/express @types/node @types/jest @types/supertest
yarn add -D eslint @eslint/eslintrc @eslint/js eslint-config-prettier eslint-plugin-prettier
yarn add -D jest ts-jest supertest
yarn add -D prettier typescript ts-node tsconfig-paths
yarn add -D @swc/cli @swc/core source-map-support ts-loader
yarn add -D typescript-eslint globals
```

### Client Dependencies (React Frontend)
```bash
# Core React dependencies
yarn add react react-dom
yarn add -D @types/react @types/react-dom

# Build tool and development
yarn add -D vite @vitejs/plugin-react typescript
yarn add -D eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh
yarn add -D globals typescript-eslint

# State Management
yarn add @reduxjs/toolkit react-redux redux redux-thunk
yarn add -D @types/react-redux redux-devtools-extension

# Routing
yarn add react-router-dom

# Forms and Validation
yarn add formik yup

# Styling
yarn add materialize-css material-icons sass
yarn add -D @types/materialize-css

# HTTP Client
yarn add axios
yarn add -D @types/axios

# Animations
yarn add @react-spring/parallax
```

## 🏗️ NestJS Module Generation Commands

```bash
# Navigate to API directory first
cd api

# Generate core modules
yarn nest g module users
yarn nest g service users
yarn nest g controller users

yarn nest g module auth
yarn nest g service auth
yarn nest g controller auth

# Generate feature modules
yarn nest g module favourites
yarn nest g service favourites
yarn nest g controller favourites

yarn nest g module notes
yarn nest g service notes
yarn nest g controller notes

# Generate DTOs (Data Transfer Objects)
yarn nest g class auth/dto/login.dto
yarn nest g class auth/dto/register.dto
yarn nest g class auth/dto/auth-response.dto

yarn nest g class favourites/dto/create-favourite.dto

yarn nest g class notes/dto/create-note.dto
yarn nest g class notes/dto/update-note.dto

# Generate Guards and Strategies
yarn nest g guard auth/guards/jwt-auth
yarn nest g class auth/strategies/jwt.strategy
```

## 🗄️ Prisma Setup Commands

```bash
# Navigate to API directory
cd api

# Initialize Prisma
yarn prisma init

# Generate Prisma client
yarn prisma generate

# Create and run migrations
yarn prisma migrate dev --name init

# View database in Prisma Studio
yarn prisma studio
```

## 🏗️ State Management Architecture

### Redux Store Structure
```
store/
├── pokemon/           # Pokemon data and operations
│   ├── pokemonList    # List of Pokemon
│   ├── pokemon        # Individual Pokemon details
│   └── loading states # Pokemon-specific loading
├── loading/           # Global loading state
│   ├── isLoading      # Global loading flag
│   └── loadingMessage # Current loading message
├── auth/              # Authentication state
│   ├── user           # Current user data
│   ├── token          # JWT authentication token
│   ├── isAuthenticated # Authentication status
│   └── loading        # Auth loading state
└── favourites/        # User favourites management
    ├── favourites     # List of user's favourite Pokemon
    ├── loading        # Favourites loading state
    └── error          # Favourites error state
```

### State Management Features
- **Centralized state** - Single Redux store for all application state
- **Loading management** - Dedicated loading slice for global loading states
- **Authentication management** - Complete auth state in Redux with persistence
- **Favourites management** - User Pokemon favourites with CRUD operations
- **Type safety** - Full TypeScript integration with Redux
- **DevTools support** - Redux DevTools for debugging
- **Middleware support** - Built-in async operation handling

## 🌐 API Endpoints

### Internal API (NestJS Backend)
- **Base URL**: `http://localhost:3000/api`
- **Authentication**: `/auth/login`, `/auth/register`
- **Users**: `/users`
- **Favourites**: `/favourites` - CRUD operations for user's favourite Pokemon
- **Notes**: `/notes` - User notes for Pokemon

### 🔒 Request Validation System
The API includes comprehensive request validation using **class-validator** and **ValidationPipe**:

#### **Global Validation Configuration**
```typescript
// api/src/main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // Strip unknown properties
    forbidNonWhitelisted: true, // Throw error for unknown properties
    transform: true,           // Auto-transform payloads to DTO instances
  }),
);
```

#### **Validation DTOs**
- **LoginDto**: Username and password validation with `@IsString()` and `@IsNotEmpty()`
- **RegisterDto**: Username (3-50 chars), password (6-100 chars), optional name with length validation
- **CreateFavouriteDto**: Pokemon ID (`@IsNumber()`) and name (`@IsString()`) validation
- **CreateNoteDto**: Content validation with `@MinLength(1)` and `@MaxLength(1000)`
- **UpdateNoteDto**: Content validation with `@MinLength(1)` and `@MaxLength(1000)`

#### **Validation Features**
- ✅ **Automatic validation** on all POST/PUT requests
- ✅ **Type transformation** from JSON to DTO instances
- ✅ **Whitelist filtering** - only allowed properties accepted
- ✅ **Error responses** with detailed validation messages
- ✅ **Length constraints** for strings and content
- ✅ **Type checking** for numbers, strings, and optional fields

### Frontend Routes
- **Home**: `/` - Landing page, `/home` - Main Pokemon grid
- **Authentication**: `/login`, `/register` - User authentication
- **Pokemon**: `/pokemon/:id` - Individual Pokemon details with favourites toggle
- **Favourites System**:
  - **Grid View**: `/favourites` - Clean card layout of all favourite Pokemon
  - **Detail View**: `/favourites/:id` - Individual favourite page with notes management
- **Error Handling**: `*` - 404 page for invalid routes

### External API Dependencies
- **PokéAPI**: [https://pokeapi.co/](https://pokeapi.co/) - The RESTful Pokémon API
  - Serves over 10 billion API calls each month
  - Provides comprehensive Pokémon data (species, stats, moves, types, etc.)
  - Free, open-source, and publicly available
  - No API key required
  - Used for fetching Pokemon data in the frontend

## 🎨 Frontend Features

- React 19 with TypeScript
- Materialize CSS for styling with comprehensive global button system
- Formik + Yup for form handling with custom validation
- React Router for navigation with protected routes
- Redux Toolkit for state management
  - Pokemon state management (list, details, loading)
  - Global loading state management
  - Authentication state management
  - User favourites management with comprehensive CRUD operations
  - Notes management with full CRUD capabilities
  - Centralized state store
- Component-based SCSS architecture
  - Individual component stylesheets
  - Global styling imports in `scss/index.scss`
  - Material Icons integration
  - Responsive design system
  - Comprehensive button system (`btn-system`) with consistent styling across all components
- Custom hooks ecosystem
  - `useAuth()` for authentication
  - `useMaterializeInit()` for component initialization
  - `useApiWithLoading()` for API calls with loading states
  - `useRedirectIfAuthenticated()` for route protection
- Comprehensive loading states with Preloader component
- Pokemon detail pages with favourites functionality
- User favourites management system
  - Add Pokemon to personal favourites collection
  - Smart toggle functionality (Add/Remove favourites from Pokemon details)
  - **Two-tier favourites system**: Clean grid view and detailed individual pages
    - **Favourites Grid** (`/favourites`) - Clean card layout with search/filter functionality
    - **Favourite Detail Pages** (`/favourites/:id`) - Dedicated pages for individual favourites
  - **Smart search and filtering** for favourite Pokemon collections
    - Real-time search with instant filtering as you type
    - Case-insensitive Pokemon name matching
    - **Type-based filtering** with visual type badges on favourite cards
    - Live result counts and clear search functionality
    - Professional search UI with Materialize CSS styling
  - Remove favourites with confirmation dialogs
  - Real-time state management with instant UI updates
  - **Professional notes management** integrated into favourite detail pages
    - **Modal-based CRUD operations** for add, edit, and delete
    - **Blog-style presentation** with newest notes first
    - **Formik integration** with Yup validation for robust form handling
    - **Character counting** with visual feedback (warning/danger states)
    - **Confirmation dialogs** with note preview for safe deletion
    - **Professional styling** with hover effects and proper spacing
  - **Enhanced user experience** with responsive design and animations
    - Smooth transitions and hover effects for all interactions
    - Mobile-optimized search interface with touch-friendly controls
    - Professional animations including fade-in effects for search results
- Integration with [PokéAPI](https://pokeapi.co/) for Pokemon data
  - Fetches Pokemon lists, details, stats, and moves
  - Handles image sprites and type information
  - Provides comprehensive Pokemon database access

## 🔒 Authentication

The application includes a complete authentication system:
- User registration and login
- JWT token-based authentication
- Protected routes
- Automatic redirects
- Persistent login state
- **Redux-based auth state management** - Complete authentication state in Redux store
- **Local storage persistence** - Login state maintained across browser sessions
- **Automatic initialization** - Auth state restored on app startup

## 🕒 Timestamp System

The application now features a comprehensive timestamp tracking system:
- **Automatic timestamps** - `createdAt` and `updatedAt` fields for all favourites and notes
- **Database-level tracking** - Prisma-managed timestamps with automatic updates
- **Real-time data** - Accurate creation and modification times for all user content
- **Professional audit trail** - Track when favourites were added and notes were created/modified
- **Enhanced user experience** - Users can see exactly when they added Pokemon to favourites
- **Data integrity** - Consistent timestamp format across all components

## 🔄 Loading System

The application features a comprehensive loading state management system:

### Global Loading States
- **Redux-based loading management** - Centralized loading state in Redux store
- **Global loading overlay** - Full-screen loading for API operations
- **Custom loading messages** - Descriptive text for each operation type

### Component Loading States
- **Form submission loading** - Integration with Formik's `isSubmitting` state
- **Route transition loading** - Loading states during navigation
- **Authentication loading** - Loading while checking user auth status
- **Data fetching loading** - Loading states for Pokemon data

### Preloader Component
- **Multiple sizes** - `small`, `medium`, `big` variants
- **Color variants** - `blue`, `red`, `green`, `yellow` options
- **Materialize CSS integration** - Consistent with app design
- **Accessibility** - Loading messages provide context

## 🚀 Deployment

### Docker Deployment (Recommended)
Complete Docker containerization setup for production-ready deployments:

```bash
# Development deployment
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Or use the deployment script
./scripts/docker-deploy.sh
```

**Docker Benefits:**
- ✅ **Fast deployments** - No environment setup issues
- ✅ **Latest stable versions** - Node.js 18 with current dependencies
- ✅ **Consistent environments** - dev, staging, production identical
- ✅ **Easy scaling** - horizontal scaling with single command
- ✅ **Production-ready** - Nginx reverse proxy and health checks

**Docker Files:**
- `docker-compose.yml` - Development orchestration
- `docker-compose.prod.yml` - Production configuration
- `api/Dockerfile` - Backend container (Node.js 18)
- `client/Dockerfile` - Frontend container (Node.js 18 + Nginx)
- `nginx/` - Reverse proxy configuration
- `scripts/docker-deploy.sh` - Automated deployment script

### Manual Deployment (AWS EC2 - Current)
The application is currently deployed on AWS EC2 using Docker containers and fully functional:
- **Frontend**: http://44.222.182.174:5173
- **API**: http://44.222.182.174:3000

#### **Deployment Architecture**
- **Containerized deployment** - Both frontend and backend run in separate Docker containers
- **Nginx serving** - Frontend served through Nginx for optimal performance
- **Production builds** - Optimized builds with proper asset processing
- **Manual container management** - Direct Docker commands for deployment control

## 📝 Notes

### Development
- The API runs on port 3000 by default
- The client runs on port 5173 by default (Vite default)
- Both servers run concurrently using the `concurrently` package
- Workspaces are configured for efficient dependency management
- All TypeScript configurations are properly set up for both projects

### State Management
- **Redux store provides centralized state management** - All state (pokemon, loading, auth) in one store
- **Loading states are managed globally through Redux** - Consistent loading across the application
- **Authentication state is managed through Redux** - Complete auth state with persistence
- **Preloader component provides consistent loading UI** across the app
- **State management is fully Redux-based** - No Context API dependencies

### Styling & UI
- **Component styling architecture** - All components have dedicated SCSS files imported via `scss/index.scss`
- **Comprehensive button system** - Global `btn-system` with consistent styling, variants, and states across all components
- **Material Icons integration** - Proper font loading and styling for all icons
- **No inline CSS** - All styling moved to proper SCSS files for maintainability
- **Modal component system** - Reusable modal wrapper with Materialize CSS integration for professional dialogs

### Features
- **Pokemon detail pages** - Individual Pokemon view with back navigation and smart favourites toggle functionality
- **User favourites system** - Complete CRUD operations for favourite Pokemon with real-time UI updates and confirmation dialogs
- **Professional notes management** - Modal-driven notes system with Formik validation and character counting

### Deployment
- **Docker containerization** - Complete setup with latest best practices (Node.js 18, clean Dockerfiles)
- **Deployment flexibility** - Both Docker and manual deployment options available
- **Production-ready** - Nginx reverse proxy, health checks, and automated deployment scripts
- **SSH key protection** - `.gitignore` includes `*.pem` files to prevent accidental commits