import React from 'react';
import { Tooltip } from '../styled/Tooltip';
import { Badge } from '../styled/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IPortfolioTechnology {
  id: number;
  category: string;
  name: string;
  description: string;
}

export interface TechnologyBadgeProps {
  technology: IPortfolioTechnology;
  mode?: 'light' | 'dark';
  style?: React.CSSProperties;
  className?: string;
}

export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
  technology,
  mode = 'light',
  style,
  className,
}) => {
  return (
    <Tooltip
      content={
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 0.5 }} variant="subtitle2">
            {technology.name}
          </Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.8 }} variant="body2">
            {technology.description}
          </Typography>
          <Typography sx={{ fontSize: 11, opacity: 0.6, mt: 0.5 }} variant="caption">
            Category: {technology.category}
          </Typography>
        </Box>
      }
      position="top"
      mode={mode}
      delay={100}
    >
      <Badge style={style} className={className}>
        {technology.name}
      </Badge>
    </Tooltip>
  );
}; 