# Environment Configuration

This document explains how to configure the frontend application for different environments.

## Environment Variables

The application uses Vite's environment variable system. Create a `.env` file in the frontend directory to configure your environment.

### Available Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Production API base URL | `http://localhost:3001/api` | No |
| `VITE_APP_VERSION` | Application version | `0.1.30` | No |

### Environment Detection

The application automatically detects the environment:

- **Development**: `npm run dev` or `yarn dev`
- **Production**: `npm run build` or `yarn build`

### Example Configuration

#### Development (.env.development)
```env
# Development environment - uses localhost by default
VITE_API_URL=http://localhost:3001/api
```

#### Production (.env.production)
```env
# Production environment
VITE_API_URL=https://your-production-api.com/api
VITE_APP_VERSION=1.0.0
```

## Usage in Code

The environment is accessible through the configuration utilities:

```typescript
import { APP_CONFIG, isDevelopment, isProduction } from './utils/config';

// Check environment
if (isDevelopment) {
  console.log('Running in development mode');
}

// Access configuration
console.log('API URL:', APP_CONFIG.apiBaseUrl);
```

## Build Commands

- **Development**: `npm run dev` - Runs development server
- **Production Build**: `npm run build` - Creates optimized production build
- **Preview**: `npm run preview` - Serves production build locally

## Docker Deployment

When deploying with Docker, set environment variables in your docker-compose.yml:

```yaml
environment:
  - VITE_API_URL=https://your-production-api.com/api
``` 