import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Paper, Stack } from '@mui/material';

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
    <Paper elevation={3} sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box style={{ flex: 1, display: 'flex' }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            style={{
              flexShrink: 1,
              width: '100%',
              height: '100%',
              maxHeight: 500,
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        )}
      </Box>
      <Stack style={{ flexShrink: 0 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, textAlign: 'center' }}>
          {title}
        </h3>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            href={url}
            component="a"
            onClick={e => {
              e.preventDefault();
              if (url) window.open(url, '_blank', 'noopener,noreferrer');
            }}
          >
            View on Github
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}; 