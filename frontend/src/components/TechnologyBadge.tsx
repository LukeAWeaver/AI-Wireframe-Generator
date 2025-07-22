import React from 'react';
import { Tooltip } from '@components/Tooltip';
import { Badge } from '@components/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { usePortfolioTechnologies } from '@contexts/PortfolioTechnologiesContext';
import { CircularProgress } from '@mui/material';
import { Text } from '@primitives/Text';

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
    Styling: '#ab47bc',
    StateAndData: '#f57c00',
    Authentication: '#d32f2f',
    Routing: '#5d4037',
    UXInteractions: '#7b1fa2',
    UIComponents: '#0288d1',
    Tooling: '#616161',
    Testing: '#455a64',
    Database: '#6d4c41',
    Hosting: '#00897b',
    CICD: '#fbc02d',
    APIs: '#0288d1',
    Compute: '#ff7043',
    Monitoring: '#8d6e63',
    Mapping: '#43a047',
    DevOps: '#0097a7',
    Cloud: '#1e88e5',
    ProgrammingLanguage: '#ffb300',
    Library: '#c2185b',
    OperatingSystem: '#757575',
    Shell: '#546e7a'
  }
  
  
  const backgroundColor = technology ? categoryColors[technology.category] || '#bdbdbd' : undefined;

  return (
    <Tooltip
      content={
        technology ? <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            {technology.name}
          </Typography>
          <Box justifyContent={"space-between"} display="flex" flexDirection="column" gap={1}>
            <Text variant="body2" sx={{ opacity: 0.8, fontSize: '0.65rem' }}>
              {technology.description}
            </Text>
            <Text variant="body2" sx={{ opacity: 0.8, fontSize: '0.55rem' }}>
              Category: {technology.category}
            </Text>
          </Box>
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