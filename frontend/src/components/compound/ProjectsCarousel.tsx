import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import staticFEDiagram from '../../assets/svg/static-FE-diagram.svg';
import reactServerlessArchDiagram from '../../assets/svg/react-aws-arch.svg';
import RDAIArchDiagram from '../../assets/svg/react-django-llm-arch.svg';
import { useRightSidebar, usePortfolioTechnologies } from '@contexts';
import { TechnologyBadge } from './TechnologyBadge';
import { CardFooter } from '../styled/CardFooter';
import { CarouselArrow } from '../styled/CarouselArrow';
import { Badge } from '../styled/Badge';
import { ProjectCard } from './ProjectCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

export const ProjectsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { setSidebarContent } = useRightSidebar();
  const { technologiesByName } = usePortfolioTechnologies();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const project = projects[selectedIndex];
    setSidebarContent(
      <Box
        sx={{
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 2 }}>
          {project.title}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#888', mb: 3, maxWidth: 320 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {project.technologiesUsed.map(techKey => {
            const technology = technologiesByName[techKey];
            return technology ? (
              <TechnologyBadge key={techKey} technology={technology} />
            ) : (
              <Badge>{techKey}</Badge>
            );
          })}
        </Box>
      </Box>
    );
  }, [selectedIndex, setSidebarContent, projects, technologiesByName]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Projects carousel"
    >
      <Typography variant="h1" sx={{ fontSize: 32, mb: 4 }}>
        More Projects
      </Typography>
      <Box width="100%" maxWidth={900} mx="auto" position="relative">
        <Box
          className="embla"
          ref={emblaRef}
          sx={{ overflow: 'hidden', borderRadius: 2 }}
        >
          <Box className="embla__container" display="flex" alignItems="center">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                technologiesByName={technologiesByName}
                isSelected={index === selectedIndex}
              />
            ))}
          </Box>
        </Box>
        {/* Carousel controls */}
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <CarouselArrow
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous project"
            active={prevBtnEnabled}
          >
            &#8592;
          </CarouselArrow>
          <CarouselArrow
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next project"
            active={nextBtnEnabled}
          >
            &#8594;
          </CarouselArrow>
        </Box>
      </Box>
    </Box>
  );
}; 