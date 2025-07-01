import React from 'react';
import { Button } from '@components/Button';
import { Box } from '@components/Box';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    children,
    orientation = 'horizontal',
    spacing = 'sm',
    fullWidth = false,
  } = props;

  const spacingMap = {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16,
  };

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: spacingMap[spacing],
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <Box style={style}>
      {children}
    </Box>
  );
}; 