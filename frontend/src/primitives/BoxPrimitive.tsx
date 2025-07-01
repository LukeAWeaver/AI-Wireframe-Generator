import React from 'react';
import Box from '@mui/material/Box';

export interface BoxPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BoxPrimitive = ({ children, ...props }: BoxPrimitiveProps) => (
  <Box {...props}>{children}</Box>
); 