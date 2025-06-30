import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardFooter } from '../styled/CardFooter';
import { Badge } from '../styled/Badge';
import { TechnologyBadge } from './TechnologyBadge';

interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

export interface IProject {
  id: string;
  title: string;
  url: string;
  svgDiagram: string;
  technologiesUsed: string[];
  description: string;
}

export interface ProjectCardProps {
  project: IProject;
  technologiesByName: Record<string, IPortfolioTechnology>;
  isSelected?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, technologiesByName, isSelected }) => {
  return (
    <Box
      className="embla__slide"
      flex="0 0 70%"
      minWidth={0}
      display="flex"
      justifyContent="center"
      sx={{
        transform: isSelected ? 'scale(1.08)' : 'scale(0.92)',
        zIndex: isSelected ? 2 : 1,
        boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.10)',
        opacity: isSelected ? 1 : 0.7,
        transition: 'transform 0.3s, box-shadow 0.3s, opacity 0.3s',
      }}
      role="group"
      aria-label={`Project: ${project.title}`}
    >
      <Box
        width="100%"
        maxWidth={400}
        minWidth={250}
        height={400}
        display="flex"
        flexDirection="column"
        sx={{
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          outline: isSelected ? '2px solid #1976d2' : 'none',
          margin: '0 auto',
          background: '#fff',
          borderRadius: 2,
          boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}
        tabIndex={0}
      >
        <Box flexGrow={1} display="flex" flexDirection="column" p={3}>
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 600, fontSize: 20, m: 0, mb: 1 }}>
            {project.title}
          </Typography>
          <Box
            component="img"
            src={project.svgDiagram}
            alt={`Architecture diagram for ${project.title}`}
            sx={{ width: '100%', height: 160, objectFit: 'contain', mb: 2 }}
          />
          <Box mt={1} fontSize={14} color="#666" textAlign="center">
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              {project.technologiesUsed.map(techKey => {
                const technology = technologiesByName[techKey];
                return (
                  <Box component="li" key={techKey}>
                    {technology ? (
                      <TechnologyBadge technology={technology} />
                    ) : (
                      <Badge>{techKey}</Badge>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
        <CardFooter>
          <Box component="a" href={project.url} target="_blank" rel="noopener noreferrer" sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
            View on GitHub
          </Box>
        </CardFooter>
      </Box>
    </Box>
  );
}; 