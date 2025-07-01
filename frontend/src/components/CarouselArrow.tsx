import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const CarouselArrow = ({ active, style, ...props }: CarouselArrowProps) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
        background: theme.palette.background.paper,
        color: active ? theme.palette.primary.main : theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 28,
        minWidth: 48,
        minHeight: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        transition: 'border 0.2s, box-shadow 0.2s',
        outline: 'none',
        ...style,
      }}
      disableElevation
      {...props}
    />
  );
}; 