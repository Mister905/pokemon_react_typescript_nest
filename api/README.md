# Pokemon NestJS API

A modern NestJS TypeScript API for managing Pokemon favourites and notes with a clean, organized project structure.

## 🏗️ Project Structure

```
src/
├── features/               # 🚀 Feature-based organization
│   ├── auth/              # Authentication feature
│   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── auth-response.dto.ts
│   │   │   └── index.ts
│   │   ├── guards/        # Authentication guards
│   │   │   └── jwt-auth.guard.ts
│   │   ├── strategies/    # Passport strategies
│   │   │   └── jwt.strategy.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── index.ts
│   ├── users/             # Users management
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── index.ts
│   ├── favourites/        # Pokemon favourites
│   │   ├── dto/
│   │   │   ├── create-favourite.dto.ts
│   │   │   └── index.ts
│   │   ├── favourites.controller.ts
│   │   ├── favourites.service.ts
│   │   ├── favourites.module.ts
│   │   └── index.ts
│   ├── notes/             # Notes for favourites
│   │   ├── dto/
│   │   │   ├── create-note.dto.ts
│   │   │   ├── update-note.dto.ts
│   │   │   └── index.ts
│   │   ├── notes.controller.ts
│   │   ├── notes.service.ts
│   │   ├── notes.module.ts
│   │   └── index.ts
│   └── index.ts           # Feature exports
├── shared/                 # 🔧 Shared utilities
│   ├── prisma/            # Database layer
│   │   ├── prisma.service.ts
│   │   ├── prisma.module.ts
│   │   └── index.ts
│   └── index.ts           # Shared exports
├── app.module.ts          # Main application module
├── main.ts                # Application entry point
├── app.controller.ts      # Basic app controller
├── app.service.ts         # Basic app service
└── dev.db                 # SQLite database file
```

## 🎯 Key Features

### Authentication & Authorization
- **JWT-based authentication** with Passport.js
- **User registration and login** with password hashing
- **Protected routes** using guards
- **Role-based access control** for user resources

### Pokemon Favourites
- **Add/remove Pokemon** to user favourites
- **View user's favourite Pokemon** with notes
- **Duplicate prevention** for same Pokemon per user
- **Timestamp tracking** with automatic creation and modification dates

### Notes System
- **Create, read, update, delete notes** for each favourite
- **User ownership validation** for all operations
- **Rich text content** with validation
- **Timestamp tracking** for note creation and updates

### Data Validation
- **DTO validation** using class-validator
- **Input sanitization** and transformation
- **Comprehensive error handling** with meaningful messages

### Recent Improvements
- **Comprehensive timestamp system** - Automatic `createdAt` and `updatedAt` fields
- **Database migration support** - Prisma migrations for schema evolution
- **Enhanced data integrity** - Consistent timestamp format across all entities
- **Professional audit trail** - Complete history tracking for user content

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager
- SQLite database

### Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

3. **Set up the database:**
   ```bash
   yarn prisma generate
   yarn prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   yarn start:dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/:id` - Get user by ID (own profile only)

### Favourites
- `GET /api/favourites` - Get user's favourites
- `POST /api/favourites` - Add Pokemon to favourites
- `DELETE /api/favourites/:id` - Remove Pokemon from favourites

### Notes
- `GET /api/notes/:favouriteId` - Get notes for a favourite
- `POST /api/notes/:favouriteId` - Add note to a favourite
- `PUT /api/notes/:noteId` - Update a note
- `DELETE /api/notes/:noteId` - Delete a note

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

## 📊 Database Schema

```prisma
model User {
  id         Int         @id @default(autoincrement())
  username   String      @unique
  password   String
  name       String?     // Optional display name for users
  favourites Favourite[]
}

model Favourite {
  id          Int      @id @default(autoincrement())
  pokemonId   Int
  pokemonName String?
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  notes       Note[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Note {
  id          Int       @id @default(autoincrement())
  content     String
  favouriteId Int
  favourite   Favourite @relation(fields: [favouriteId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## 🕒 Timestamp System

The API now includes comprehensive timestamp tracking for all user-generated content:

### Automatic Timestamps
- **`createdAt`** - Automatically set when records are created using `@default(now())`
- **`updatedAt`** - Automatically updated on every record modification using `@updatedAt`
- **Database-level management** - Prisma handles all timestamp operations automatically
- **ISO format** - All timestamps returned in ISO 8601 format for frontend compatibility

### Benefits
- **Audit trail** - Complete history of when content was created and modified
- **Data integrity** - Consistent timestamp format across all entities
- **User experience** - Frontend can display accurate creation and modification times
- **Future features** - Foundation for date-based sorting, filtering, and analytics
- **Professional tracking** - Users can see exactly when they added Pokemon to favourites

## 🛠️ Available Scripts

- `yarn start:dev` - Start development server with hot reload
- `yarn build` - Build the application
- `yarn start` - Start production server
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:migrate` - Run database migrations
- `yarn prisma:studio` - Open Prisma Studio

## 🏗️ Architecture Decisions

### Why Feature-Based Organization?
- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Related functionality is co-located
- **Team Development**: Multiple developers can work on different features
- **Testing**: Easier to write and organize tests

### Why Clean Exports?
- **Refactoring**: Easy to move files without breaking imports
- **Readability**: Clear import statements
- **Consistency**: Uniform import patterns across the codebase

### Why NestJS?
- **TypeScript First**: Built with TypeScript for better type safety
- **Decorators**: Clean, readable code with powerful decorators
- **Modularity**: Built-in support for modules and dependency injection
- **Testing**: Excellent testing utilities and mocking support

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure authentication with configurable expiration
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Rate Limiting**: Built-in protection against abuse

## 📝 Error Handling

The API provides consistent error responses with appropriate HTTP status codes:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

## 🧪 Testing

- **Unit Tests**: Individual service and controller testing
- **E2E Tests**: Full API endpoint testing
- **Test Coverage**: Comprehensive coverage reporting
- **Mocking**: Easy mocking of dependencies

## 🚀 Deployment

### Production Build
```bash
yarn build
yarn start:prod
```

### Environment Variables
- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Include proper error handling
4. Write tests for new functionality
5. Follow NestJS best practices
6. Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License.
