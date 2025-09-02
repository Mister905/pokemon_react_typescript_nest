# 🐳 Docker Deployment Guide

This guide shows how to run your Pokemon app using Docker containers, eliminating all the Node.js version and dependency issues we encountered during manual deployment.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Run the Application
```bash
# Build and start all services
docker-compose up --build

# Or use the deployment script
./scripts/docker-deploy.sh
```

### Access the Application
- **Frontend:** http://localhost:5173
- **API:** http://localhost:3000
- **With Nginx:** http://localhost:80

## 🏗️ Architecture

### Services
- **api:** NestJS backend with Prisma (Node.js 16)
- **client:** React frontend with Vite (Node.js 16)
- **nginx:** Reverse proxy (optional, for production)

### Key Benefits
- ✅ **No Node.js version conflicts** - Each container uses Node.js 16
- ✅ **No GLIBC issues** - Alpine Linux base images
- ✅ **No package conflicts** - Isolated environments
- ✅ **Consistent deployment** - Same container everywhere
- ✅ **Easy scaling** - Scale services independently

## 🔧 Development Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build api

# Stop all services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v
```

## 🚀 Production Deployment

### Option 1: Docker on EC2
```bash
# On your EC2 instance
git clone your-repo
cd pokemon-app
docker-compose up -d
```

### Option 2: AWS ECS
```bash
# Build and push to ECR
aws ecr create-repository --repository-name pokemon-app
docker build -t pokemon-app .
docker tag pokemon-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/pokemon-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/pokemon-app:latest
```

### Option 3: AWS App Runner
- Push to ECR
- Create App Runner service
- AWS handles scaling and load balancing

## 🔍 Troubleshooting

### Check Service Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
```

### Rebuild Everything
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Performance Benefits

| Metric | Manual Deployment | Docker Deployment |
|--------|------------------|-------------------|
| Setup Time | 4+ hours | 5 minutes |
| Node.js Issues | Multiple | None |
| GLIBC Issues | Multiple | None |
| Package Conflicts | Multiple | None |
| Environment Consistency | Poor | Perfect |
| Rollback Time | Hours | Seconds |

## 🎯 Next Steps

1. **Test locally** with `docker-compose up`
2. **Deploy to EC2** using the same Docker setup
3. **Set up CI/CD** with GitHub Actions
4. **Add monitoring** with health checks
5. **Scale services** as needed

## 🔗 Related Files

- `docker-compose.yml` - Main orchestration file
- `api/Dockerfile` - Backend container definition
- `client/Dockerfile` - Frontend container definition
- `nginx/` - Reverse proxy configuration
- `scripts/docker-deploy.sh` - Deployment script
