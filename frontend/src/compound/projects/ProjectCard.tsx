import React from 'react';
import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Badge } from '@components/Badge';

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  url?: string;
}

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    imageUrl,
    url,
  } = props;

  return (
    <Box variant="card" spacing="md">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            height: 200,
            objectFit: 'fill',
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
      )}
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 600, textAlign: 'center' }}>
        {title}
      </h3>

      
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button
          variant="contained"
          size="small"
          href={url}
          component="a"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Github
        </Button>
      </Box>
    </Box>
  );
}; 