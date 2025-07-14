# Pokemon React TypeScript Client

A modern React TypeScript application for browsing Pokemon data with a clean, organized project structure.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Home/            # Home page component
│   │   ├── Home.tsx     # Component implementation
│   │   ├── Home.styles.scss  # Component styles
│   │   └── index.ts     # Clean exports
│   ├── PokemonDetail/   # Pokemon detail view component
│   │   ├── PokemonDetail.tsx     # Pokemon detail page
│   │   ├── PokemonDetail.styles.scss  # Pokemon card styling
│   │   └── index.ts     # Clean exports
│   ├── Nav/             # Navigation component with authentication
│   │   ├── Nav.tsx      # Navigation with mobile support
│   │   ├── Nav.styles.scss  # Navigation styling
│   │   └── index.ts     # Clean exports
│   ├── Login/           # Login form component
│   │   ├── Login.tsx    # Login form with validation
│   │   ├── Login.styles.scss  # Form styling
│   │   └── index.ts     # Clean exports
│   ├── Register/        # Registration form component
│   │   ├── Register.tsx # Registration with validation
│   │   ├── Register.styles.scss  # Form styling
│   │   └── index.ts     # Clean exports
│   ├── Favourites/      # User favourites management system
│   │   ├── Favourites.tsx       # Main favourites grid view with search/filter
│   │   ├── FavouriteCard.tsx    # Individual favourite card (clean design)
│   │   ├── FavouriteDetail.tsx  # Dedicated favourite detail page with notes
│   │   ├── Favourites.styles.scss  # Grid view styling with search UI
│   │   ├── FavouriteDetail.styles.scss  # Detail page styling
│   │   └── index.ts     # Clean exports
│   ├── Notes/           # Notes management system
│   │   ├── Notes.tsx            # Main notes component with modal integration
│   │   ├── AddNoteModal.tsx     # Modal for adding new notes
│   │   ├── EditNoteModal.tsx    # Modal for editing existing notes
│   │   ├── DeleteNoteModal.tsx  # Confirmation modal for note deletion
│   │   ├── Notes.styles.scss    # Notes and modal styling
│   │   └── index.ts             # Clean exports
│   ├── Modal/           # Reusable modal component
│   │   ├── Modal.tsx            # Base modal wrapper with Materialize integration
│   │   ├── Modal.styles.scss    # Modal styling and animations
│   │   └── index.ts             # Clean exports
│   ├── GlobalLoading/   # Global loading overlay component
│   │   ├── GlobalLoading.tsx     # Loading overlay
│   │   ├── GlobalLoading.styles.scss  # Overlay styling
│   │   └── index.ts     # Clean exports
│   ├── Landing/         # Landing page component
│   ├── Preloader/       # Loading spinner component
│   ├── ProtectedRoute/  # Route protection component
│   ├── 404/             # Not found page component
│   └── index.ts         # Centralized component exports
├── features/             # Feature-based organization (Redux Toolkit)
│   ├── pokemon/          # Pokemon feature module
│   │   ├── pokemonActions.ts  # Async thunks and actions
│   │   ├── pokemonSlice.ts    # Redux slice with reducers
│   │   └── index.ts           # Feature exports
│   ├── loading/          # Loading state management
│   │   └── loadingSlice.ts    # Global loading state slice
│   ├── auth/             # Authentication feature module
│   │   ├── authSlice.ts       # Auth state slice with reducers
│   │   └── index.ts           # Auth feature exports
│   └── favourites/       # User favourites feature module
│       ├── favouritesSlice.ts # Favourites state slice with async thunks
│       └── index.ts           # Favourites feature exports
│   └── notes/            # Notes feature module
│       ├── notesSlice.ts      # Notes state slice with async thunks
│       └── index.ts           # Notes feature exports
├── hooks/                # Custom React hooks
│   └── index.ts         # Hook exports including Redux hooks
├── store/                # Redux store configuration
│   └── index.ts         # Store setup with pokemon, loading, auth, and favourites reducers
├── types/                # TypeScript type definitions
│   ├── pokemon.ts       # Pokemon-related types
│   ├── api.ts           # API response types
│   └── index.ts         # Type exports
├── utils/                # Utility functions
│   ├── pokemonMapper.ts # Pokemon data transformation
│   ├── axios.ts         # HTTP client configuration
│   └── index.ts         # Utility exports
├── scss/                 # Global styles and component imports
│   └── index.scss       # Global styles, Material Icons, component imports
├── assets/               # Static assets (images, icons)
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (e.g., `Home.tsx`, `PokemonDetail.tsx`)
- **Features**: camelCase (e.g., `pokemonActions.ts`, `pokemonSlice.ts`)
- **Utilities**: camelCase (e.g., `pokemonMapper.ts`, `axios.ts`)
- **Types**: camelCase (e.g., `pokemon.ts`, `api.ts`)
- **Directories**: camelCase (e.g., `components/`, `features/`)

### Code Style
- **Components**: PascalCase (e.g., `const Home = () => {}`)
- **Functions**: camelCase (e.g., `getPokemonList`, `mapPokeAPIToPokemon`)
- **Variables**: camelCase (e.g., `pokemonList`, `loadingState`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Interfaces**: PascalCase with descriptive names (e.g., `PokemonListItem`, `GetPokemonListArgs`)

## Best Practices

### 1. Feature-Based Organization
- Group related functionality together in feature folders
- Each feature contains its own actions, reducers, and types
- Promotes better code organization and maintainability

### 2. State Management
- **Redux Toolkit** for all state management (pokemon, loading, auth, favourites)
- **Feature-based slices** for organized state structure
- **Type-safe actions** with TypeScript integration
- **Centralized store** for consistent state access
- **Async thunks** for API operations with proper error handling

### 3. Clean Exports
- Use index files for clean, centralized exports
- Avoid deep import paths (e.g., `import { Home } from './components'`)
- Makes refactoring easier and imports cleaner

### 4. Type Safety
- Use TypeScript interfaces for all component props
- Avoid `any` type - prefer explicit types or generics
- Export types from centralized locations

### 5. Component Structure
- One component per file
- Separate styles into dedicated SCSS files (imported via `scss/index.scss`)
- Use functional components with hooks
- Include proper prop interfaces
- No inline styles - all styling in SCSS files
- Use global `btn-system` classes for consistent button styling across components
- Proper button structure with `<span>` tags for text alignment

### 6. Error Handling
- Add try-catch blocks in async operations
- Provide meaningful error messages
- Handle edge cases gracefully

### 7. Import Organization
- Group imports by type (React, third-party, local)
- Use absolute imports where possible
- Maintain consistent import ordering

## Search and Filter System

The application includes intelligent search and filtering functionality for managing large collections of favourite Pokemon:

### Search Features
- **Real-time filtering** - Instant results as user types (no search button needed)
- **Case-insensitive matching** - "pika" finds "Pikachu", "PIKACHU", etc.
- **Partial matching** - "char" finds "Charizard", "Charmander", etc.
- **Live result counts** - Shows "X of Y favourites match 'search term'"
- **Clear search functionality** - One-click reset to view all favourites

### Type-Based Filtering
- **Visual type badges** - Each favourite card displays Pokemon types with color-coded badges
- **Multi-type support** - Handles dual-type Pokemon (e.g., Charizard: Fire/Flying)
- **Professional styling** - Authentic Pokemon type colors matching game aesthetics
- **Comprehensive mapping** - 40+ Pokemon with proper type mappings for Gen 1 favourites
- **Instant filtering** - Filter favourites by type with immediate visual feedback
- **Combined search** - Use text search and type filters together for precise results

### Technical Implementation
```typescript
// Local state management for optimal performance
const [searchTerm, setSearchTerm] = useState('');

// Optimized filtering with useMemo to prevent unnecessary re-computation
const filteredFavourites = useMemo(() => {
  if (!searchTerm.trim()) return favourites;
  return favourites.filter(favourite =>
    favourite.pokemonName.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [favourites, searchTerm]);
```

### User Experience
- **Professional search UI** with Materialize CSS styling
- **Search icon and placeholder text** for clear visual cues
- **Smooth animations** and hover effects for enhanced interaction
- **Mobile-responsive design** with touch-friendly controls
- **Accessibility features** with proper labels and keyboard navigation

## Notes and Modal System

The application features a professional modal-based notes management system:

### Modal Components
- **Base Modal** - Reusable modal wrapper with Materialize CSS integration
- **AddNoteModal** - Professional form modal for creating new notes
- **EditNoteModal** - In-place editing modal with pre-filled content
- **DeleteNoteModal** - Confirmation dialog with note preview and safety warnings

### Features
- **Formik Integration** - Robust form validation with Yup schemas
- **Character Counting** - Real-time feedback with warning/danger states (900+/990+ characters)
- **Professional UX** - Clean, focused editing without page navigation
- **Safety Features** - Confirmation dialogs prevent accidental deletions
- **Always Visible** - Notes section automatically displayed under each favourite Pokemon
- **Responsive Design** - Mobile-friendly modals with proper touch targets

### Usage Examples
```tsx
// Notes component automatically displays under favourite Pokemon
<Notes 
  favouriteId={favourite.id} 
  pokemonName={favourite.pokemonName}
  className="notes-in-card"
/>

// Modal state management
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
```

## Global Button System

The application uses a comprehensive button system for consistent styling and behavior:

### Button Classes
- **Base Class**: `btn-system` - Core button styling with Press Start 2P font
- **Size Variants**: `btn-small`, `btn-large` for different contexts
- **Color Variants**: `btn-primary`, `btn-secondary`, `btn-success`, `btn-danger`, `btn-warning`, `btn-info`, `btn-light`, `btn-dark`
- **Special Classes**: `btn-nav` for navigation, `btn-favourited` for success states, `btn-loading` for async operations

### Usage Examples
```tsx
// Primary action button
<button className="btn-system btn-primary">Login</button>

// Navigation button with proper alignment
<Link className="btn-system btn-danger btn-nav">Favourites</Link>

// Large prominent button
<button className="btn-system btn-success btn-large">Add to Favourites</button>

// Loading state button
<button className="btn-system btn-primary btn-loading">Processing...</button>
```

### Features
- **Consistent Typography**: All buttons use the same font and sizing
- **Hover Effects**: Uniform hover animations with proper shadows
- **Icon Alignment**: Material Icons properly aligned with text
- **Loading States**: Built-in loading animations and disabled states
- **Responsive**: Proper scaling and touch targets across devices
- **Navigation Alignment**: Special `btn-nav` class for perfect navigation bar alignment
- **Form Integration**: Seamless integration with Formik forms and validation

## Authentication System

The client includes a complete authentication system built with Redux:

### Features
- **User Registration & Login** - Complete auth forms with validation
- **JWT Token Management** - Secure token storage and handling
- **Protected Routes** - Route protection based on authentication status
- **Persistent Login** - Authentication state maintained across sessions
- **Redux Integration** - All auth state managed through Redux store
- **User Favourites** - Personal Pokemon collection management with real-time state updates
- **CRUD Operations** - Add, view, and remove favourite Pokemon with smart toggle functionality
- **Smart Navigation** - Logo routes to appropriate page based on auth status
- **Un-favouriting** - Remove Pokemon from favourites directly from detail pages
- **Notes Management** - Complete CRUD operations for Pokemon notes with professional interface
  - **Blog-Style Display** - Notes sorted by newest first for chronological viewing
  - **Modal-Based Operations** - Clean, focused editing without page navigation
  - **Add Notes** - Professional modal with Formik validation and character counting
  - **Edit Notes** - Pre-filled editing modal with full validation
  - **Delete Notes** - Confirmation dialogs with note preview and safety warnings
  - **Dedicated Detail Pages** - Full notes management on individual favourite pages
- **Search and Filtering** - Intelligent search functionality for favourite collections
  - **Real-Time Search** - Instant filtering as user types with no search button needed
  - **Smart Matching** - Case-insensitive Pokemon name search with partial matching
  - **Live Results** - Dynamic result counts and clear search functionality
  - **Professional UI** - Materialize CSS styled search input with search icon and animations

### Architecture
- **Auth Slice** - Redux slice for authentication state
- **Custom Hooks** - `useAuth()` hook for easy auth state access
- **Route Protection** - `ProtectedRoute` component for secure navigation
- **Automatic Redirects** - Smart redirects based on auth status

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start development server:
   ```bash
   yarn dev
   ```

3. Build for production:
   ```bash
   yarn build
   ```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Dependencies

### Core Dependencies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Materialize CSS** - UI framework with global button alignment fixes and modal system
- **Material Icons** - Icon font integration
- **SCSS** - CSS preprocessing with component-based architecture
- **Formik** - Form handling and validation with modal integration
- **Yup** - Schema validation
- **Vite** - Build tool and dev server

### External API Dependencies
- **PokéAPI** - [https://pokeapi.co/](https://pokeapi.co/)
  - The RESTful Pokémon API serving over 10 billion calls monthly
  - Provides comprehensive Pokemon data (species, stats, moves, sprites, types)
  - Free and open-source with no API key required
  - Used for all Pokemon data fetching in the application

## Architecture Decisions

### Why PokéAPI Integration?
- **Comprehensive Data**: Access to complete Pokemon database (1000+ Pokemon)
- **Rich Information**: Stats, moves, abilities, types, sprites, and more
- **Reliability**: Serves over 10 billion API calls monthly with high uptime
- **No Authentication**: Free access without API keys or rate limits
- **Community Maintained**: Open-source project with active development
- **Standard Format**: Well-documented RESTful API with consistent responses

### Why Feature-Based Organization?
- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Related code is co-located
- **Team Development**: Multiple developers can work on different features
- **Testing**: Easier to write and organize tests

### Why Two-Tier Favourites System?
- **Clean Grid View**: `/favourites` shows clean cards with search functionality for efficient browsing
- **Dedicated Detail Pages**: `/favourites/:id` provides focused space for comprehensive notes management
- **Better UX Flow**: Separation between browsing favourites and detailed management
- **Professional Layout**: Detail pages similar to Pokemon detail pages for consistency
- **Improved Performance**: Notes only load when viewing individual favourites
- **Enhanced Discovery**: Search and filter capabilities make large collections manageable

### Why Modal-Based Notes System?
- **Professional UX**: Clean, focused editing experience without page navigation
- **Form Validation**: Robust Formik + Yup integration for data integrity
- **Safety**: Confirmation dialogs prevent accidental deletions with note previews
- **Accessibility**: Proper modal focus management and keyboard navigation
- **Consistency**: Uniform modal design across all notes operations
- **Real-time Updates**: Immediate UI feedback for all CRUD operations
- **Blog-Style Display**: Newest notes first for chronological organization

### Why Local State for Search?
- **Performance**: No Redux overhead for real-time filtering on every keystroke
- **Simplicity**: Direct state management without action dispatching complexity
- **Component-specific**: Search state is only relevant to the Favourites component
- **Ephemeral nature**: Search terms don't need persistence across navigation
- **Optimized rendering**: `useMemo` prevents unnecessary re-filtering
- **Fast development**: Less boilerplate code for temporary state management

### Why Timestamp System?
- **Data Integrity**: Automatic `createdAt` and `updatedAt` fields for all user content
- **Professional Tracking**: Users can see exactly when they added Pokemon to favourites
- **Audit Trail**: Complete history of when content was created and last modified
- **Enhanced UX**: Real dates instead of generic "Recently" messages
- **Database Consistency**: Prisma-managed timestamps with automatic updates
- **Future Features**: Foundation for date-based sorting, filtering, and analytics

### Styling Architecture
- **Component-based SCSS** - Each component has its own stylesheet
- **Global imports** - All component styles imported via `scss/index.scss`
- **No inline styles** - All styling externalized to SCSS files for maintainability
- **Material Icons integration** - Proper font loading and icon styling with multiple size variants
- **Comprehensive Button System** - Global `btn-system` classes for consistent styling across all components
- **Navigation Alignment** - Special `btn-nav` class ensures perfect alignment in navigation bars
- **Semantic Color System** - Buttons use semantic colors (primary, success, danger, etc.) for clear action communication
- **Modal System** - Professional modal styling with proper animations and responsive design
- **Form Styling** - Global form validation styling with error states and character counting
- **Search UI Styling** - Professional search input styling with focus states and animations
- **Responsive design** - Mobile-first approach with proper breakpoints and touch-friendly targets

### Loading State Management
- **Global loading overlay** - Full-screen loading for API operations
- **Component-level loading** - Individual component loading states
- **Form submission loading** - Integration with Formik's built-in states
- **Preloader component** - Consistent loading UI across the application
- **Redux integration** - Centralized loading state management

### Why Clean Exports?
- **Refactoring**: Easy to move files without breaking imports
- **Readability**: Clear import statements
- **Consistency**: Uniform import patterns across the codebase

### Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IntelliSense and refactoring
- **Maintainability**: Self-documenting code
- **Team Collaboration**: Clear contracts between components
