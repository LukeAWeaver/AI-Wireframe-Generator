import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import staticFEDiagram from '../assets/svg/static-FE-diagram.svg';
import reactServerlessArchDiagram from '../assets/svg/react-aws-arch.svg';
import RDAIArchDiagram from '../assets/svg/react-django-llm-arch.svg';
import { useRightSidebar, usePortfolioTechnologies } from '@contexts';
import { TechnologyBadge } from '../components/compound/TechnologyBadge';

interface IProject {
  id: string;
  title: string;
  url: string;
  svgDiagram: string;
  technologiesUsed: string[];
}

const projects: IProject[] = [
  {
    id: 'tech-dem0-files',
    title: 'Static FE Serverless ( React + Next.js )',
    url: 'https://github.com/LukeAWeaver/tech-dem0-files',
    svgDiagram: staticFEDiagram,
    technologiesUsed: ['React', 'Next.js', 'Vite', 'TypeScript', 'MUI'],
  },
  {
    id: 'soda-sopa-files',
    title: 'Full Stack Serverless ( React + AWS )',
    url: 'https://github.com/LukeAWeaver/SodaSopa-Vite',
    svgDiagram: reactServerlessArchDiagram,
    technologiesUsed: ['React', 'AWS Lambda', 'AWS AppSync', 'AWS S3', 'Redux Toolkit', 'TypeScript', 'MUI'],
  },
  {
    id: 'this-project-files',
    title: 'Full Stack ( React + Django ) + local LLM',
    url: 'https://github.com/LukeAWeaver/AI-UX-visualization',
    svgDiagram: RDAIArchDiagram,
    technologiesUsed: ['React', 'Django', 'TypeScript', 'MUI', 'Redux Toolkit', 'Axios'],
  },
];

export const Projects: React.FC = () => {
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
    setSidebarContent(
      <div style={{ padding: 16, textAlign: 'center' }}>
        <img
          src={projects[selectedIndex].svgDiagram}
          alt={`Architecture diagram for ${projects[selectedIndex].title}`}
          style={{
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            maxHeight: '350px',
            objectFit: 'contain',
          }}
        />
        <div style={{ marginTop: 8, fontSize: 14, color: '#888' }}>
          {projects[selectedIndex].title} Architecture
        </div>
      </div>
    );
  }, [selectedIndex, setSidebarContent, projects]);

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
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Projects carousel"
    >
      <h1 style={{ fontSize: 32, marginBottom: 32 }}>More Projects</h1>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <div
          className="embla"
          ref={emblaRef}
          style={{
            overflow: 'hidden',
            borderRadius: 16,
          }}
        >
          <div className="embla__container" style={{ display: 'flex', alignItems: 'center' }}>
            {projects.map((project, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={project.id}
                  className="embla__slide"
                  style={{
                    flex: '0 0 70%',
                    minWidth: 0,
                    padding: '0 2%',
                    display: 'flex',
                    justifyContent: 'center',
                    transform: isSelected ? 'scale(1.08)' : 'scale(0.92)',
                    zIndex: isSelected ? 2 : 1,
                    boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.10)',
                    opacity: isSelected ? 1 : 0.7,
                    transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.3s',
                  }}
                  role="group"
                  aria-label={`Project ${index + 1} of ${projects.length}: ${project.title}`}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 400,
                      minWidth: 250,
                      height: 400,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                      outline: isSelected ? '2px solid #1976d2' : 'none',
                      margin: '0 auto',
                      background: '#fff',
                      borderRadius: 16,
                      boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.10)',
                      overflow: 'hidden',
                    }}
                    tabIndex={0}
                  >
                    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 24 }}>
                      <h2 style={{ textAlign: 'center', fontWeight: 600, fontSize: 20, margin: 0, marginBottom: 8 }}>
                        {project.title}
                      </h2>
                      <img
                        src={project.svgDiagram}
                        alt={`Architecture diagram for ${project.title}`}
                        style={{ width: '100%', height: 160, objectFit: 'contain', marginBottom: 16 }}
                      />
                      <div style={{ marginTop: 8, fontSize: 14, color: '#666', textAlign: 'center' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
                          {project.technologiesUsed.map(techKey => {
                            const technology = technologiesByName[techKey];
                            return (
                              <li key={techKey}>
                                {technology ? (
                                  <TechnologyBadge technology={technology} />
                                ) : (
                                  <span style={{ background: '#f5f5f5', borderRadius: 8, padding: '2px 8px', fontSize: 13 }}>
                                    {techKey}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div style={{ padding: 16, borderTop: '1px solid #eee', textAlign: 'center' }}>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Carousel controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous project"
            style={{ padding: 8, borderRadius: 8, border: 'none', background: '#eee', cursor: prevBtnEnabled ? 'pointer' : 'not-allowed' }}
          >
            &#8592;
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next project"
            style={{ padding: 8, borderRadius: 8, border: 'none', background: '#eee', cursor: nextBtnEnabled ? 'pointer' : 'not-allowed' }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}; 