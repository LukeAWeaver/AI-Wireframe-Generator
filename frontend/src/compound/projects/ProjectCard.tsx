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
}

export const ProjectCard = (props: ProjectCardProps) => {
  const {
    title,
    description,
    technologies,
    imageUrl,
    onViewDetails,
    onEdit,
    onDelete,
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
            objectFit: 'cover',
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
      )}
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 600 }}>
        {title}
      </h3>
      
      <p style={{ margin: '0 0 16px 0', color: '#666', lineHeight: 1.5 }}>
        {description}
      </p>
      
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {technologies.map(tech => (
          <Badge key={tech}>
            {tech}
          </Badge>
        ))}
      </Box>
      
      <Box style={{ display: 'flex', gap: 8 }}>
        {onViewDetails && (
          <Button variant="contained" size="small" onClick={onViewDetails}>
            View Details
          </Button>
        )}
        {onEdit && (
          <Button variant="outlined" size="small" onClick={onEdit}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button variant="text" size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
}; 