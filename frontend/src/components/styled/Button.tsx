import React from 'react';
import { ButtonPrimitive, ButtonPrimitiveProps } from '../primitives/ButtonPrimitive';
import { getTheme } from '../../theme/theme';

export interface ButtonProps extends Omit<ButtonPrimitiveProps, 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  mode?: 'light' | 'dark';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  mode = 'light',
  style,
  disabled,
  ...props
}) => {
  const theme = getTheme(mode);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.fontSizes.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.fontSizes.md,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.fontSizes.lg,
    },
  };

  const variantStyles = {
    primary: {
      background: theme.colors.primary,
      color: theme.colors.onPrimary,
      border: 'none',
    },
    secondary: {
      background: theme.colors.secondary,
      color: theme.colors.onPrimary,
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
    },
  };

  const hoverStyles = {
    primary: {
      background: theme.colors.primary,
      filter: 'brightness(1.1)',
    },
    secondary: {
      background: theme.colors.secondary,
      filter: 'brightness(1.1)',
    },
    ghost: {
      background: theme.colors.primary,
      color: theme.colors.onPrimary,
      border: `1px solid ${theme.colors.primary}`,
    },
  };

  const activeStyles = {
    primary: {
      background: theme.colors.primary,
      filter: 'brightness(0.95)',
    },
    secondary: {
      background: theme.colors.secondary,
      filter: 'brightness(0.95)',
    },
    ghost: {
      background: theme.colors.primary,
      color: theme.colors.onPrimary,
      border: `1px solid ${theme.colors.primary}`,
      filter: 'brightness(0.95)',
    },
  };

  const focusStyles = {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
    outline: 'none',
  };

  const disabledStyles = {
    opacity: 0.5,
    cursor: 'not-allowed',
    filter: 'grayscale(0.5)',
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: theme.radii.md,
    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, filter 0.2s',
    cursor: 'pointer',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isHovered ? hoverStyles[variant] : {}),
    ...(isActive ? activeStyles[variant] : {}),
    ...(isFocused ? focusStyles : {}),
    ...(disabled ? disabledStyles : {}),
    ...style,
  };

  return (
    <ButtonPrimitive
      {...props}
      disabled={disabled}
      style={baseStyle}
      onMouseEnter={e => {
        setIsHovered(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        setIsHovered(false);
        setIsActive(false);
        props.onMouseLeave?.(e);
      }}
      onMouseDown={e => {
        setIsActive(true);
        props.onMouseDown?.(e);
      }}
      onMouseUp={e => {
        setIsActive(false);
        props.onMouseUp?.(e);
      }}
      onFocus={e => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={e => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
    />
  );
}; 