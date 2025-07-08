import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { H3, Body2Description } from '@ui/components/typography';
import { Stack, useTheme } from '@mui/material';
import { FlippableCard } from '@components/FlippableCard';
import { TechnologyBadge } from '@compound/projects/TechnologyBadge';

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

  const frontContent = (
      <Stack style={{ flex: 1, display: 'flex', height: "100%", justifyContent: 'space-between' }}>
          <Box style={{ flex: 1, flexGrow: 1, flexShrink: 0}}>
          <H3 style={{ textAlign: 'center' }}>{title}</H3>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '100%',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </Box>
        <Stack style={{ flex:1, flexGrow: 0, flexShrink: 1}}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              href={url}
              component="a"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (url) {
                  window.open(url, '_blank', 'noopener,noreferrer')
                }
              }}
            >
              View on Github
            </Button>
          </Box>
        </Stack>
      </Stack>
  );

  const backContent = (
      <Stack spacing={2} style={{ flex: 1, height: '100%' }}>
        <H3 style={{ textAlign: 'center' }}>{title}</H3>
        <Box style={{ flex: 1, overflow: 'auto' }}>
          <Body2Description>{description}</Body2Description>
        </Box>
        {technologies.length > 0 && (
          <Box>
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {technologies.map((tech, index) => (
                <TechnologyBadge key={index} techName={tech} />
              ))}
            </Box>
          </Box>
        )}
        <Box style={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            color="primary"
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
  );

  return (
    <FlippableCard mustBeSelectedToFlip={isSelected} frontContent={frontContent} backContent={backContent} />
  );
}; 