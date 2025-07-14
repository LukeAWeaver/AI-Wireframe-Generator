import nextServerlessDiagram from '@assets/svg/nextjs-serverless-diagram.svg';
import reactServerlessArchDiagram from '@assets/svg/react-aws-arch.svg';
import RDAIArchDiagram from '@assets/svg/react-django-llm-arch.svg';
import { ProjectsCarousel } from '@compound';

interface IProject {
  id: string;
  title: string;
  url: string;
  purpose: string;
  svgDiagram: string;
  technologiesUsed: string[];
  description: string;
}

const projects: IProject[] = [
  {
    id: 'this-project-files',
    title: 'React + Django + local LLM',
    purpose: "Wireframe Generator",
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    svgDiagram: RDAIArchDiagram,
    technologiesUsed: ['React', 'Django', 'TypeScript', 'MUI', 'Redux Toolkit', 'Axios'],
    description: "A full-stack monorepo web app that takes natural language descriptions from users and returns rendered wireframes utilizing Ollama + llama4:Mavrick. This app tunnels API requests securely to a GPU-hosted LLM over Cloudflare. Ideal for visual prototyping and real-time prompt-to-layout interactions.",
    // description: `The project follows a modern monorepo architecture with a clear separation between frontend and backend services. The frontend is built with React, TypeScript, and Material-UI (MUI), utilizing a comprehensive theming system that defines design tokens (colors, typography, spacing, etc.) in a centralized theme/index.ts file. The backend is an Express.js API that handles AI-related requests. Both services are containerized using Docker, with hot-reloading enabled for development through volume mounts and nodemon (backend) and Vite (frontend). The architecture emphasizes type safety with TypeScript throughout, modular component design with reusable UI components like DynamicForm, and a clean separation of concerns where the frontend handles UI/UX while the backend manages AI processing and data operations. The entire system is orchestrated through Docker Compose, which manages the services, volumes, and networking, making it easy to develop and deploy the application as a cohesive unit.`,
  },
  {
    id: 'tech-dem0-files',
    title: 'NextFire Stack',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    purpose: "Stock Analyzer",
    svgDiagram: nextServerlessDiagram,
    technologiesUsed: ['React', 'Next.js', 'Vite', 'TypeScript', 'MUI'],
    description: 'Users can sign in anonymously or with Google to view and analyze live stock data. It demonstrates real-time data rendering, dynamic filtering, and authentication flow integration.',
  },
  {
    id: 'soda-sopa-files',
    title: 'Serverless JAMstack',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    purpose: "Soda Machine for Gamers",
    svgDiagram: reactServerlessArchDiagram,
    technologiesUsed: ['React', 'AWS Lambda', 'AWS AppSync', 'AWS S3', 'Redux Toolkit', 'TypeScript', 'MUI'],
    description: 'Soda Machine is a gamified web app that lets users spend virtual coins to purchase digital soda cans, powered by AWS Lambda and GraphQL. Users regenerate one coin every 2 hours via a scheduled backend job. After a purchase, the app generates a downloadable .json file representing the soda — complete with metadata.',
  },
];

export const Projects = () => <ProjectsCarousel projects={projects} />;

export { projects }; 