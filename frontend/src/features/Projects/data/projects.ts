import NextServerlessDiagram from '@assets/svg/nextjs-serverless-diagram.svg?react';
import ReactServerlessArchDiagram from '@assets/svg/react-aws-arch.svg?react';
import RDAIArchDiagram from '@assets/svg/react-django-llm-arch.svg?react';
import KafkaIntegrationDiagram from '@assets/svg/kafka-integration-diagram.svg?react';

export interface IProject {
  id: string;
  title: string;
  url?: string;
  purpose: string;
  SvgDiagram: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  technologiesUsed: string[];
  description: string;
}

const projects: IProject[] = [
  {
    id: 'api-integration-project',
    title: 'Field Management Information System (FMIS)',
    purpose: "OAuth + FMIS Integration",
    SvgDiagram: KafkaIntegrationDiagram,
    technologiesUsed: ['React', 'TypeScript', 'Mapbox', 'Django', 'OAuth 2.0', 'Kafka', 'PostgreSQL', 'REST APIs', 'Express'],
    description: "Implemented a secure, multi-step OAuth flow and API integration to connect third-party FMIS data providers. Facilitated seamless data import and mapping between external APIs and internal databases, enabling streamlined data workflows and enhanced user interactions."
  },
    {
    id: 'soda-sopa-files',
    title: 'Gamer theme Soda Machine',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    purpose: "Serverless JAMstack",
    SvgDiagram: ReactServerlessArchDiagram,
    technologiesUsed: ['React', 'AWS Lambda', 'AWS AppSync', 'AWS S3', 'Redux Toolkit', 'TypeScript', 'MUI'],
    description: 'Soda Machine is a gamified web app that lets users spend virtual coins to purchase digital soda cans, powered by AWS Lambda and GraphQL. Users regenerate one coin every 2 hours via a scheduled backend job. After a purchase, the app generates a downloadable .json file representing the soda — complete with metadata.',
  },
  {
    id: 'tech-dem0-files',
    title: 'Real-Time Stock Dashboard',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    purpose: "OAuth + Firebase + Yahoo Finance API",
    SvgDiagram: NextServerlessDiagram,
    technologiesUsed: ['React', 'Next.js', 'TypeScript', 'MUI', 'Firebase Authentication', "REST APIs", 'Firebase Realtime DB', 'OAuth 2.0', 'Axios'],
    description: 'Demonstrates a production-ready authentication flow with Firebase (Google OAuth and anonymous sign-in), real-time stock data fetching from Yahoo finance API, and dynamic, responsive UI rendering using Next.js. Built to showcase practical integration of secure user auth, API consumption, and live client updates—ideal for dashboards, fintech, or data-driven apps.',
  },
    {
    id: 'this-project-files',
    title: 'Wireframe Generator',
    purpose: "React + DRF + LLM",
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    SvgDiagram: RDAIArchDiagram,
    technologiesUsed: ['React', 'Django', 'TypeScript', 'MUI', 'Redux Toolkit', 'Axios'],
    description: "A full-stack monorepo web app that takes natural language descriptions from users and returns rendered wireframes utilizing Ollama + llama4:Mavrick. This app tunnels API requests securely to a GPU-hosted LLM over Cloudflare. Ideal for visual prototyping and real-time prompt-to-layout interactions.",
  },
];

export { projects }; 