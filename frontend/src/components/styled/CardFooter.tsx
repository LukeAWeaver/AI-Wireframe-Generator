import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}; 