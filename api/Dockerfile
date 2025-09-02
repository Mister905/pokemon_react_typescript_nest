# Use Node.js 16 (same version that works on your EC2)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with the same flags that worked
RUN yarn install --ignore-engines --legacy-peer-deps

# Downgrade Prisma to working version (same as EC2 fix)
RUN yarn add prisma@4.16.0 @prisma/client@4.16.0 --ignore-engines

# Copy source code
COPY . .

# Generate Prisma client (same as working setup)
RUN npx prisma generate

# Create .env file for database
RUN echo "DATABASE_URL=file:./dev.db" > .env

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application (same as working setup)
CMD ["yarn", "start:prod"]
