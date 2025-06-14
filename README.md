# AI Feature Explorer

A monorepo containing a React frontend and Express backend for exploring AI features with dynamic form generation.

## Project Structure

```
.
├── frontend/          # React + Vite frontend
└── backend/          # Express API backend
```

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

- Dynamic form rendering based on JSON schema
- AI-powered form schema generation using GPT-4
- Modern UI with Tailwind CSS
- TypeScript support
- Hot module replacement with Vite
- Express backend API
- Docker support for both services