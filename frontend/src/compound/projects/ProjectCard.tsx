import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { H3, Body2Description, Caption } from '@ui/components/typography';
import { Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { ProjectCardWrapper } from '@ui/components';

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isSelected: boolean
  url?: string;
}

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    description,
    technologies,
    imageUrl,
    isSelected,
    url,
  } = props;

  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme()
  const handleCardClick = () => {
    if(isSelected) {
      setIsFlipped(!isFlipped)
    }
  };

  return (
    <Box
      style={{
        perspective: '1000px',
        width: '100%',
        height: '400px',
        cursor: 'pointer',
        backgroundColor: theme.palette.background.default,
        minHeight: '400px',
      }}
      onClick={handleCardClick}
    >
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease-in-out',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <ProjectCardWrapper
          cardVariant="elevated"
          isSelected={isSelected}
        >
          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
            ) : (
              <Box style={{ 
                width: '100%', 
                height: '200px', 
                backgroundColor: theme.palette.background.paper, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 8,
              }}>
                <Caption color="textSecondary">No Image</Caption>
              </Box>
            )}
          </Box>
          <Stack style={{ flexShrink: 0, marginTop: 16 }}>
            <H3 style={{ textAlign: 'center' }}>
              {title}
            </H3>
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <Button
                variant="contained"
                href={url}
                component="a"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
              >
                View on Github
              </Button>
            </Box>
          </Stack>
        </ProjectCardWrapper>

        {/* Back of card */}
        <ProjectCardWrapper
          cardVariant="flat"
          isFlipped={true}
          sx={{
            transform: 'rotateY(180deg)',
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Stack spacing={2} style={{ flex: 1, height: '100%' }}>
            <H3 style={{ textAlign: 'center' }}>
              {title}
            </H3>
            
            <Box style={{ flex: 1, overflow: 'auto' }}>
              <Body2Description>
                {description}
              </Body2Description>
            </Box>

            {technologies.length > 0 && (
              <Box>
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {technologies.map((tech, index) => (
                    <Box
                      key={index}
                      style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        padding: '4px 8px',
                        borderRadius: 12,
                        fontSize: theme.typography.caption.fontSize,
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (url) window.open(url, '_blank', 'noopener,noreferrer');
                }}
              >
                View on Github
              </Button>
            </Box>
          </Stack>
        </ProjectCardWrapper>
      </Box>
    </Box>
  );
}; 