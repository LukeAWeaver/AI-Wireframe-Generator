import React from 'react';
import MUIBox from '@mui/material/Box';

export interface BoxPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Box = ({ children, ...props }: BoxPrimitiveProps) => (
  <MUIBox {...props}>{children}</MUIBox>
); 