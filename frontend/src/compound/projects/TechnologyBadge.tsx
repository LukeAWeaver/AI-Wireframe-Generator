import React from 'react';
import { Tooltip } from '@components/Tooltip';
import { Badge } from '@components/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TechnologyDescription, TechnologyCategory } from '@ui/components/typography';
import { usePortfolioTechnologies } from '@contexts/PortfolioTechnologiesContext';
import { CircularProgress } from '@mui/material';

export interface TechnologyBadgeProps {
  techName: string;
  mode?: 'light' | 'dark';
  style?: React.CSSProperties;
  className?: string;
}

export const TechnologyBadge = (props: TechnologyBadgeProps) => {
  const { techName, mode = 'light', style, className } = props;
  const { technologiesByName } = usePortfolioTechnologies();
  const technology = technologiesByName[techName]
  if(!techName) {
    return <></>
  }
  // Map categories to background colors
  const categoryColors: Record<string, string> = {
    Frontend: '#1976d2',
    Backend: '#388e3c',
    Styling: '#8e24aa',
    StateAndData: '#fbc02d',
    Authentication: '#d32f2f',
    Routing: '#0288d1',
    UXInteractions: '#f57c00',
    UIComponents: '#455a64',
    Tooling: '#616161',
    Testing: '#c2185b',
    Database: '#6d4c41',
  };
  const backgroundColor = technology ? categoryColors[technology.category] || '#bdbdbd' : undefined;
  console.log(technology)
  return (
    <Tooltip
      content={
        technology ? <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            {technology.name}
          </Typography>
          <TechnologyDescription variant="body2">
            {technology.description}
          </TechnologyDescription>
          <TechnologyCategory variant="caption">
            Category: {technology.category}
          </TechnologyCategory>
        </Box> : <CircularProgress/>
      }
      position="top"
      mode={mode}
      delay={100}
    >
      <Badge style={{ ...style, ...(backgroundColor ? { backgroundColor, color: '#fff' } : {}) }} className={className}>
        {techName}
      </Badge>
    </Tooltip>
  );
}; 