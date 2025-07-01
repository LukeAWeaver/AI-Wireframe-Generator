import React from 'react';
import { ButtonPrimitive } from '../primitives/ButtonPrimitive';
import { useTheme } from '@mui/material/styles';

export interface ButtonProps extends React.ComponentProps<typeof ButtonPrimitive> {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export const Button = (props: ButtonProps) => {
  const theme = useTheme();

  const sizeStyles = {
    small: {
      padding: theme.spacing(0.5, 1),
      fontSize: theme.typography.body2.fontSize,
    },
    medium: {
      padding: theme.spacing(1, 2),
      fontSize: theme.typography.body1.fontSize,
    },
    large: {
      padding: theme.spacing(1.5, 3),
      fontSize: theme.typography.h6.fontSize,
    },
  };

  const combinedStyle = {
    ...sizeStyles[props.size || 'medium'],
    ...props.style,
  };

  return (
    <ButtonPrimitive
      {...props}
      variant={props.variant || 'contained'}
      size={props.size || 'medium'}
      color={props.color || 'primary'}
      style={combinedStyle}
    />
  );
}; 