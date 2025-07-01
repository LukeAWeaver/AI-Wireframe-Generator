import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

export interface CarouselArrowProps extends ButtonProps {
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
        minWidth: 32,
        minHeight: 32,
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