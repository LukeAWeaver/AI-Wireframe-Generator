import React from 'react';
import { TooltipPrimitive, TooltipPrimitiveProps } from '../primitives/TooltipPrimitive';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export interface TooltipProps extends TooltipPrimitiveProps {
  mode?: 'light' | 'dark';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  ...props
}) => {
  const theme = useTheme();

  const tooltipContent = (
    <Box
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: 1,
        borderRadius: theme.shape.borderRadius,
        boxShadow: 3,
        fontSize: theme.typography.body2.fontSize,
        maxWidth: 250,
        wordWrap: 'break-word',
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 9999,
        position: 'relative',
      }}
    >
      {content}
    </Box>
  );

  return (
    <TooltipPrimitive
      content={tooltipContent}
      position={position}
      {...props}
    >
      {children}
    </TooltipPrimitive>
  );
}; 