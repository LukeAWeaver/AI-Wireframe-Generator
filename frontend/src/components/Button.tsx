import React from 'react';
import { ButtonPrimitive } from '../primitives/ButtonPrimitive';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../contexts/ThemeContext';
import { colors } from '../theme/tokens';

export interface ButtonProps extends React.ComponentProps<typeof ButtonPrimitive> {
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

// Only support palette keys that exist in tokens
const paletteKeys = ['primary', 'secondary', 'error'] as const;
type PaletteKey = typeof paletteKeys[number];

export const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

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

  // Determine color style based on color prop and theme mode
  let colorStyle = {};
  const mode = isDarkMode ? 'dark' : 'light';
  const paletteColor = paletteKeys.includes(props.color as PaletteKey) ? props.color as PaletteKey : undefined;
  if (paletteColor) {
    if (props.variant === 'contained') {
      colorStyle = {
        backgroundColor: colors[mode][paletteColor],
        color: colors[mode].onPrimary,
      };
    } else if (props.variant === 'outlined' || props.variant === 'text') {
      colorStyle = {
        color: colors[mode][paletteColor],
        borderColor: props.variant === 'outlined' ? colors[mode][paletteColor] : undefined,
      };
    }
  }

  const combinedStyle = {
    ...sizeStyles[props.size || 'medium'],
    ...colorStyle,
    ...props.style,
  };

  return (
    <ButtonPrimitive
      {...props}
      style={combinedStyle}
    />
  );
}; 