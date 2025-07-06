import React from 'react';
import { Tooltip } from '@components/Tooltip';
import { Badge } from '@components/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TechnologyDescription, TechnologyCategory } from '@ui/components/typography';

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

export const TechnologyBadge = (props: TechnologyBadgeProps) => {
  const { technology, mode = 'light', style, className } = props;

  return (
    <Tooltip
      content={
        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            {technology.name}
          </Typography>
          <TechnologyDescription variant="body2">
            {technology.description}
          </TechnologyDescription>
          <TechnologyCategory variant="caption">
            Category: {technology.category}
          </TechnologyCategory>
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