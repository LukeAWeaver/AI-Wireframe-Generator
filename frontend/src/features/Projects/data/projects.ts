import NextServerlessDiagram from '@assets/svg/nextjs-serverless-diagram.svg?react';
import ReactServerlessArchDiagram from '@assets/svg/react-aws-arch.svg?react';
import RDAIArchDiagram from '@assets/svg/react-django-llm-arch.svg?react';

export interface IProject {
  id: string;
  title: string;
  url: string;
  purpose: string;
  SvgDiagram: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  technologiesUsed: string[];
  description: string;
}

const projects: IProject[] = [
  {
    id: 'this-project-files',
    title: 'React + DRF + LLM',
    purpose: "Wireframe Generator",
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    SvgDiagram: RDAIArchDiagram,
    technologiesUsed: ['React', 'Django', 'TypeScript', 'MUI', 'Redux Toolkit', 'Axios'],
    description: "A full-stack monorepo web app that takes natural language descriptions from users and returns rendered wireframes utilizing Ollama + llama4:Mavrick. This app tunnels API requests securely to a GPU-hosted LLM over Cloudflare. Ideal for visual prototyping and real-time prompt-to-layout interactions.",
  },
  {
    id: 'soda-sopa-files',
    title: 'Serverless JAMstack',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    purpose: "Soda Machine for Gamers",
    SvgDiagram: ReactServerlessArchDiagram,
    technologiesUsed: ['React', 'AWS Lambda', 'AWS AppSync', 'AWS S3', 'Redux Toolkit', 'TypeScript', 'MUI'],
    description: 'Soda Machine is a gamified web app that lets users spend virtual coins to purchase digital soda cans, powered by AWS Lambda and GraphQL. Users regenerate one coin every 2 hours via a scheduled backend job. After a purchase, the app generates a downloadable .json file representing the soda — complete with metadata.',
  },
  {
    id: 'tech-dem0-files',
    title: 'NextFire Stack',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    purpose: "Stock Analyzer",
    SvgDiagram: NextServerlessDiagram,
    technologiesUsed: ['React', 'Next.js', 'Vite', 'TypeScript', 'MUI'],
    description: 'Users can sign in anonymously or with Google to view and analyze live stock data. It demonstrates real-time data rendering, dynamic filtering, and authentication flow integration.',
  },
];

export { projects }; 