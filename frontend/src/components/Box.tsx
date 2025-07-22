import React from 'react';
import { Box as BoxPrimitive } from '../primitives/Box';
import { useTheme } from '@mui/material/styles';

export interface BoxProps extends React.ComponentProps<typeof BoxPrimitive> {
  variant?: 'default' | 'card' | 'section';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const Box = (props: BoxProps) => {
  const theme = useTheme();

  const variantStyles = {
    default: {},
    card: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2),
    },
    section: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  };

  const spacingStyles = {
    none: {},
    sm: { padding: theme.spacing(1) },
    md: { padding: theme.spacing(2) },
    lg: { padding: theme.spacing(3) },
  };

  const combinedStyle = {
    ...variantStyles[props.variant || 'default'],
    ...spacingStyles[props.spacing || 'none'],
    ...props.style,
  };

  return <BoxPrimitive {...props} style={combinedStyle} />;
}; 