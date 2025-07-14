# Pokemon React TypeScript NestJS Application

A full-stack Pokemon application built with React TypeScript frontend and NestJS backend.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- Yarn >= 1.22.0

### Installation
```bash
# Install all dependencies (root, client, and API)
yarn install:all

# Or install just the root dependencies
yarn install
```

### Development

**Run both client and API concurrently:**
```bash
yarn dev
```

**Or use the convenience script:**
```bash
# On macOS/Linux
./scripts/dev.sh dev

# On Windows
scripts\dev.bat dev
```

This will start:
- **API**: NestJS backend on `http://localhost:3000`
- **Client**: React frontend on `http://localhost:5173`

### Individual Commands

**API only:**
```bash
yarn dev:api
```

**Client only:**
```bash
yarn dev:client
```

**Production build:**
```bash
yarn build
```

**Start production servers:**
```bash
yarn start
```

## 📁 Project Structure

```
pokemon_react_typescript_nest/
├── api/                 # NestJS backend
│   ├── src/
│   │   ├── features/   # Feature modules (auth, users, etc.)
│   │   └── main.ts     # Application entry point
│   └── package.json
├── client/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/ # React components with dedicated SCSS files
│   │   ├── features/   # Redux slices (pokemon, loading, auth)
│   │   ├── store/      # Redux store configuration
│   │   ├── hooks/      # Custom hooks (useAuth, useMaterializeInit, etc.)
│   │   ├── scss/       # Global styles and component imports
│   │   └── main.tsx    # React entry point
│   └── package.json
└── package.json         # Root package.json with concurrent scripts
```

## 🔧 Available Scripts

### Root Level Commands
- `yarn dev` - Run both client and API in development mode
- `yarn build` - Build both client and API
- `yarn start` - Start both client and API in production mode
- `yarn test` - Run tests for both client and API
- `yarn lint` - Lint both client and API
- `yarn clean` - Clean node_modules and build artifacts

### Convenience Scripts
- `./scripts/dev.sh dev` (macOS/Linux) - Run both servers
- `scripts\dev.bat dev` (Windows) - Run both servers
- `./scripts/dev.sh api` - Run API only
- `./scripts/dev.sh client` - Run client only

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

### API Commands
- `yarn dev:api` - Start NestJS in development mode with hot reload
- `yarn build:api` - Build NestJS application
- `yarn start:api` - Start NestJS in production mode

### Client Commands
- `yarn dev:client` - Start React dev server with Vite
- `yarn build:client` - Build React application
- `yarn start:client` - Start React production server

## 🌐 API Endpoints

### Internal API (NestJS Backend)
- **Base URL**: `http://localhost:3000/api`
- **Authentication**: `/auth/login`, `/auth/register`
- **Users**: `/users`
- **Favourites**: `/favourites` - CRUD operations for user's favourite Pokemon
- **Notes**: `/notes` - User notes for Pokemon

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

## 📱 Responsive Design

- Mobile-first approach
- Materialize CSS grid system
- Hamburger menu for mobile navigation
- Responsive forms and components
- Loading states optimized for all screen sizes

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run API tests only
yarn test:api

# Run client tests only
yarn test:client
```

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

```bash
# Build for production
yarn build

# Start production servers
yarn start
```

## 🔧 Development Workflow

1. **Start development**: `yarn dev`
2. **Make changes** to client or API code
3. **Hot reload** will automatically refresh both servers
4. **State management**: Use Redux DevTools to monitor all state changes (pokemon, loading, auth, favourites)
5. **Loading states**: Global loading overlay shows during API operations
6. **Authentication**: Monitor auth state changes in Redux DevTools
7. **Favourites**: Test adding/removing Pokemon from favourites
8. **Build and test**: `yarn build && yarn test`
9. **Deploy**: Use the production build commands

## 📝 Notes

- The API runs on port 3000 by default
- The client runs on port 5173 by default (Vite default)
- Both servers run concurrently using the `concurrently` package
- Workspaces are configured for efficient dependency management
- All TypeScript configurations are properly set up for both projects
- **Redux store provides centralized state management** - All state (pokemon, loading, auth) in one store
- **Loading states are managed globally through Redux** - Consistent loading across the application
- **Authentication state is managed through Redux** - Complete auth state with persistence
- **Preloader component provides consistent loading UI** across the app
- **State management is fully Redux-based** - No Context API dependencies
- **Component styling architecture** - All components have dedicated SCSS files imported via `scss/index.scss`
- **Comprehensive button system** - Global `btn-system` with consistent styling, variants, and states across all components
- **Material Icons integration** - Proper font loading and styling for all icons
- **No inline CSS** - All styling moved to proper SCSS files for maintainability
- **Modal component system** - Reusable modal wrapper with Materialize CSS integration for professional dialogs
- **Pokemon detail pages** - Individual Pokemon view with back navigation and smart favourites toggle functionality
- **User favourites system** - Complete CRUD operations for favourite Pokemon with real-time UI updates and confirmation dialogs
- **Professional notes management** - Modal-driven notes system with Formik validation and character counting
