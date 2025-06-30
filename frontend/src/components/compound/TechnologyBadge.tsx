import React from 'react';
import { Tooltip } from '../styled/Tooltip';

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
  const defaultStyle: React.CSSProperties = {
    background: '#f5f5f5',
    borderRadius: 8,
    padding: '2px 8px',
    fontSize: 13,
    display: 'inline-block',
    cursor: 'help',
    ...style,
  };

  return (
    <Tooltip
      content={
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {technology.name}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {technology.description}
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            Category: {technology.category}
          </div>
        </div>
      }
      position="top"
      mode={mode}
      delay={100}
    >
      <span style={defaultStyle} className={className}>
        {technology.name}
      </span>
    </Tooltip>
  );
}; 