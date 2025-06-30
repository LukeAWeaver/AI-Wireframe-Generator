import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge: React.FC<BadgeProps> = ({ children, style, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        px: 1,
        py: 0.5,
        fontSize: theme.typography.body2.fontSize,
        display: 'inline-block',
        border: `1px solid ${theme.palette.divider}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}; 