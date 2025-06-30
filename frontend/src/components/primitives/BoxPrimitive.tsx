import React from 'react';
import Box from '@mui/material/Box';

export interface BoxPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BoxPrimitive: React.FC<BoxPrimitiveProps> = ({ children, ...props }) => (
  <Box {...props}>{children}</Box>
); 