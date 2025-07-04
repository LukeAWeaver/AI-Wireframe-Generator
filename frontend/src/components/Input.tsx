import React from 'react';
import { InputPrimitive } from '../primitives/InputPrimitive';
import { useTheme } from '@mui/material/styles';

export interface InputProps extends Omit<React.ComponentProps<typeof InputPrimitive>, 'size'> {
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Input = (props: InputProps) => {
  const theme = useTheme();

  const sizeStyles = {
    small: {
      padding: theme.spacing(0.5, 1),
      fontSize: theme.typography.body2.fontSize,
    },
    medium: {
      padding: theme.spacing(1, 1.5),
      fontSize: theme.typography.body1.fontSize,
    },
    large: {
      padding: theme.spacing(1.5, 2),
      fontSize: theme.typography.h6.fontSize,
    },
  };

  const variantStyles = {
    outlined: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
    },
    filled: {
      border: 'none',
      borderBottom: `2px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.action.hover,
    },
    standard: {
      border: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: 'transparent',
    },
  };

  const combinedStyle = {
    ...sizeStyles[props.size || 'medium'],
    ...variantStyles[props.variant || 'outlined'],
    width: props.fullWidth ? '100%' : 'auto',
    color: theme.palette.text.primary,
    ...props.style,
  };

  const sizeMap = { small: 24, medium: 32, large: 40 };
  const inputSize = typeof props.size === 'string' ? sizeMap[props.size] : props.size;

  return (
    <InputPrimitive
      {...props}
      style={combinedStyle}
      size={inputSize}
    />
  );
}; 