# AI Feature Explorer

A React + Django monorepo for exploring AI features with wireframe generation.
🌍 deployed site: https://ai-ux-visualization.onrender.com
## 🌍 Deployment Architecture & Traffic Flow
Client (Browser, Frontend, API Request)
    ↓ HTTPS (TCP 443)
→ Render-hosted Django API
    (Managed by Render, HTTPS via Render's certs, fully cloud-hosted backend API)
    ↓
→ Ollama API
    (Traffic flows to Cloudflare Edge → Secure Cloudflare Tunnel → localhost:11434)

## Project Structure

```
.
├── frontend/          # React + Vite frontend
└── backend/          # Express API backend
```

## architecture
The project follows a modern monorepo architecture with a clear separation between frontend and backend services. The frontend is built with React, TypeScript, and Material-UI (MUI), utilizing a comprehensive theming system that defines design tokens (colors, typography, spacing, etc.) in a centralized theme/index.ts file. The backend is an Express.js API that handles AI-related requests. Both services are containerized using Docker, with hot-reloading enabled for development through volume mounts and nodemon (backend) and Vite (frontend). The architecture emphasizes type safety with TypeScript throughout, modular component design with reusable UI components like DynamicForm, and a clean separation of concerns where the frontend handles UI/UX while the backend manages AI processing and data operations. The entire system is orchestrated through Docker Compose, which manages the services, volumes, and networking, making it easy to develop and deploy the application as a cohesive unit.

## Development Setup

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example` and add your OpenAI API key:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at http://localhost:3001

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:8087

### Using Docker

#### Option 1: Docker Compose (Recommended)

1. Create the backend `.env` file:
```bash
cd backend
cp .env.example .env
# Edit .env and add your OpenAI API key
```

2. Start both services:
```bash
docker-compose up
```

This will start both the frontend and backend services with hot-reloading enabled.

#### Option 2: Individual Containers

##### Backend

1. Build the backend image:
```bash
cd backend
docker build -t ai-feature-explorer-backend .
```

2. Run the backend container:
```bash
docker run -p 3001:3001 ai-feature-explorer-backend
```

##### Frontend

1. Build the frontend image:
```bash
cd frontend
docker build -t ai-feature-explorer-frontend .
```

2. Run the frontend container:
```bash
docker run -p 8087:8087 ai-feature-explorer-frontend
```

## Features

- Wireframe rendering based on JSON schema
- AI-powered form schema generation using GPT-4
- Modern UI with Tailwind CSS
- TypeScript support
- Hot module replacement with Vite
- Express backend API
- Docker support for both services