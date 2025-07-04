import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ children, style, ...props }: BadgeProps) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 1,
        px: 1,
        py: 0.5,
        fontSize: theme.typography.body2.fontSize,
        border: `1px solid ${theme.palette.divider}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}; 