import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import staticFEDiagram from '../assets/svg/static-FE-diagram.svg';
import reactServerlessArchDiagram from '../assets/svg/react-aws-arch.svg';
import RDAIArchDiagram from '../assets/svg/react-django-llm-arch.svg';
import { useRightSidebar, usePortfolioTechnologies } from '@contexts';
import { TechnologyBadge } from '../components/compound/TechnologyBadge';
import { CardFooter } from '../components/styled/CardFooter';
import { CarouselArrow } from '../components/styled/CarouselArrow';
import { Badge } from '../components/styled/Badge';
import { ProjectCard } from '../components/compound/ProjectCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProjectsCarousel } from '../components/compound/ProjectsCarousel';

interface IProject {
  id: string;
  title: string;
  url: string;
  svgDiagram: string;
  technologiesUsed: string[];
  description: string;
}

const projects: IProject[] = [
  {
    id: 'tech-dem0-files',
    title: 'Static FE Serverless ( React + Next.js )',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    svgDiagram: staticFEDiagram,
    technologiesUsed: ['React', 'Next.js', 'Vite', 'TypeScript', 'MUI'],
    description: 'A modern, responsive web application for financial data visualization and analysis, built with Next.js, React, MUI, PrimeReact, and Firebase. This project integrates real-time stock market data, provides authentication, and demonstrates scalable UI patterns.',
  },
  {
    id: 'soda-sopa-files',
    title: 'Full Stack Serverless ( React + AWS )',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    svgDiagram: reactServerlessArchDiagram,
    technologiesUsed: ['React', 'AWS Lambda', 'AWS AppSync', 'AWS S3', 'Redux Toolkit', 'TypeScript', 'MUI'],
    description: 'A modern, responsive web application built with Vite, React, MUI, Redux Toolkit, and GraphQL. This project integrates authentication with Google OAuth, dynamic data interactions via Apollo Client, and demonstrates scalable UI patterns with state management and component-driven architecture.',
  },
  {
    id: 'this-project-files',
    title: 'Full Stack ( React + Django ) + local LLM',
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    svgDiagram: RDAIArchDiagram,
    technologiesUsed: ['React', 'Django', 'TypeScript', 'MUI', 'Redux Toolkit', 'Axios'],
    description: `The project follows a modern monorepo architecture with a clear separation between frontend and backend services. The frontend is built with React, TypeScript, and Material-UI (MUI), utilizing a comprehensive theming system that defines design tokens (colors, typography, spacing, etc.) in a centralized theme/index.ts file. The backend is an Express.js API that handles AI-related requests. Both services are containerized using Docker, with hot-reloading enabled for development through volume mounts and nodemon (backend) and Vite (frontend). The architecture emphasizes type safety with TypeScript throughout, modular component design with reusable UI components like DynamicForm, and a clean separation of concerns where the frontend handles UI/UX while the backend manages AI processing and data operations. The entire system is orchestrated through Docker Compose, which manages the services, volumes, and networking, making it easy to develop and deploy the application as a cohesive unit.`,
  },
];

export const Projects = () => <ProjectsCarousel />; 