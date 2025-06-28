import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link,
  IconButton,
  useTheme,
  Paper,
} from '@mui/material';
import { GitHub, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import useEmblaCarousel from 'embla-carousel-react';
import staticFEDiagram from '../assets/svg/static-FE-diagram.svg';
import reactServerlessArchDiagram from '../assets/svg/react-aws-arch.svg';
import RDAIArchDiagram from '../assets/svg/react-django-llm-arch.svg';
import { useRightSidebar } from './RightSidebarContext';
import { usePortfolioTechnologies } from './PortfolioTechnologiesContext';

interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

interface IProject {
  id: string;
  title: string;
  url: string;
  svgDiagram: string;
  technologies?: IPortfolioTechnology[];
}

const projects: IProject[] = [
  {
    id: 'tech-dem0-files',
    title: 'Static FE Serverless ( React + Next.js )',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    svgDiagram: staticFEDiagram,
  },
  {
    id: 'soda-sopa-files',
    title: 'Full Stack Serverless ( React + AWS )',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    svgDiagram: reactServerlessArchDiagram,
  },
  {
    id: 'this-project-files',
    title: 'Full Stack ( React + Django ) + local LLM',
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    svgDiagram: RDAIArchDiagram,
    technologies: [/* Will be populated dynamically */],
  },
];

export const Projects: React.FC = () => {
  const theme = useTheme();
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
  const { technologies, technologiesByName, loading, error } = usePortfolioTechnologies();
  console.log('PortfolioTechnologiesContext value:', { technologies, technologiesByName, loading, error });

  // Dynamically populate technologies for the current project
  const projectsWithTechnologies = projects.map(project => {
    if (project.id === 'this-project-files') {
      return {
        ...project,
        technologies: [
          technologiesByName['React'],
          technologiesByName['Django'],
          technologiesByName['TypeScript'],
          technologiesByName['MUI'],
          technologiesByName['Redux Toolkit'],
          technologiesByName['Axios'],
        ].filter(Boolean) // Remove any undefined entries
      };
    }
    return project;
  });

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
    setSidebarContent(
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <img
          src={projectsWithTechnologies[selectedIndex].svgDiagram}
          alt={`Architecture diagram for ${projectsWithTechnologies[selectedIndex].title}`}
          style={{
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            maxHeight: '350px',
            objectFit: 'contain',
          }}
        />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
          {projectsWithTechnologies[selectedIndex].title} Architecture
        </Typography>
      </Box>
    );
  }, [selectedIndex, setSidebarContent, projectsWithTechnologies]);

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
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Projects carousel"
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        More Projects
      </Typography>
      <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', position: 'relative' }}>
        <Box
          className="embla"
          ref={emblaRef}
          sx={{
            overflow: 'hidden',
            borderRadius: 2,
            '& .embla__container': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .embla__slide': {
              flex: '0 0 70%',
              minWidth: 0,
              padding: '0 2%',
              display: 'flex',
              justifyContent: 'center',
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
            },
          }}
        >
          <Box className="embla__container">
            {projectsWithTechnologies.map((project, index) => {
              const isSelected = index === selectedIndex;
              return (
                <Box
                  key={project.id}
                  className="embla__slide"
                  sx={{
                    transform: isSelected ? 'scale(1.08)' : 'scale(0.92)',
                    zIndex: isSelected ? 2 : 1,
                    boxShadow: isSelected ? 6 : 2,
                    opacity: isSelected ? 1 : 0.7,
                    transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.3s',
                  }}
                  role="group"
                  aria-label={`Project ${index + 1} of ${projects.length}: ${project.title}`}
                >
                  <Card
                    elevation={isSelected ? 6 : 2}
                    sx={{
                      width: '100%',
                      maxWidth: '400px',
                      minWidth: '250px',
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                      outline: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
                      margin: '0 auto',
                    }}
                    tabIndex={0}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        {project.title}
                      </Typography>

                      {/* SVG Diagram */}
                      <Box
                        sx={{
                          mb: 3,
                          textAlign: 'center',
                          flexGrow: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={project.svgDiagram}
                          alt={`Architecture diagram for ${project.title}`}
                          style={{
                            maxWidth: '100%',
                            width: '80%',
                            height: 'auto',
                            maxHeight: '200px',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>

                      {/* GitHub Link */}
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          textDecoration: 'none',
                          color: 'primary.main',
                          fontWeight: 500,
                          padding: 1,
                          borderRadius: 1,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                            textDecoration: 'none',
                          },
                          '&:focus': {
                            outline: `2px solid ${theme.palette.primary.main}`,
                            outlineOffset: '2px',
                          },
                        }}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <GitHub fontSize="small" />
                        View on GitHub
                      </Link>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <IconButton
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          sx={{
            position: 'absolute',
            left: '-32px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&:focus': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: '2px',
            },
            zIndex: 3,
          }}
          aria-label="Previous project"
        >
          <KeyboardArrowLeft />
        </IconButton>

        <IconButton
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          sx={{
            position: 'absolute',
            right: '-32px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&:focus': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: '2px',
            },
            zIndex: 3,
          }}
          aria-label="Next project"
        >
          <KeyboardArrowRight />
        </IconButton>

        {/* Dots Indicator */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mt: 3,
          }}
        >
          {projects.map((_, index) => (
            <Box
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: index === selectedIndex ? 'primary.main' : 'action.disabled',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: index === selectedIndex ? 'primary.dark' : 'action.hover',
                },
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: '2px',
                },
              }}
              role="button"
              tabIndex={0}
              aria-label={`Go to project ${index + 1}`}
              aria-pressed={index === selectedIndex}
            />
          ))}
        </Box>
      </Box>

      {projects.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No projects available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Check back soon for new projects!
          </Typography>
        </Paper>
      )}
    </Box>
  );
}; 