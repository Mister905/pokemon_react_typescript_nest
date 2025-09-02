# Use Node.js 16 (same version that works)
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with the same flags that worked
RUN yarn install --ignore-engines --legacy-peer-deps

# Downgrade Vite to working version (same as EC2 fix)
RUN yarn add vite@4.5.0 --dev --ignore-engines

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Use nginx to serve the built files
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
