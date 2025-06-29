import React from 'react';
import { InputPrimitive, InputPrimitiveProps } from '../primitives/InputPrimitive';
import { getTheme } from '../../theme/theme';

export interface InputProps extends Omit<InputPrimitiveProps, 'size'> {
  variant?: 'outline' | 'ghost' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  mode?: 'light' | 'dark';
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: string[];
}

export const Input: React.FC<InputProps> = ({
  variant = 'outline',
  size = 'md',
  mode = 'light',
  style,
  multiline,
  rows,
  select,
  options,
  ...props
}) => {
  const theme = getTheme(mode);

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
    outline: {
      background: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
      color: theme.colors.text,
    },
    solid: {
      background: theme.colors.surface,
      border: 'none',
      color: theme.colors.text,
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: theme.colors.text,
    },
  };

  const baseStyle: React.CSSProperties = {
    borderRadius: theme.radii.md,
    outline: 'none',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    boxShadow: 'none',
    width: '100%',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const [isFocused, setIsFocused] = React.useState(false);

  if (select && options) {
    return (
      <select
        {...props as any}
        style={{
          ...baseStyle,
          ...(isFocused
            ? {
                boxShadow: `0 0 0 2px ${theme.colors.primary}`,
                borderColor: theme.colors.primary,
              }
            : {}),
          ...style,
        }}
        onFocus={(e: React.FocusEvent<HTMLSelectElement>) => {
          setIsFocused(true);
          props.onFocus?.(e as any);
        }}
        onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
          setIsFocused(false);
          props.onBlur?.(e as any);
        }}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  if (multiline) {
    return (
      <textarea
        {...props as any}
        rows={rows || 3}
        style={{
          ...baseStyle,
          resize: 'vertical',
          ...(isFocused
            ? {
                boxShadow: `0 0 0 2px ${theme.colors.primary}`,
                borderColor: theme.colors.primary,
              }
            : {}),
          ...style,
        }}
        onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          props.onFocus?.(e as any);
        }}
        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          props.onBlur?.(e as any);
        }}
      />
    );
  }

  return (
    <InputPrimitive
      {...props}
      style={{
        ...baseStyle,
        ...(isFocused
          ? {
              boxShadow: `0 0 0 2px ${theme.colors.primary}`,
              borderColor: theme.colors.primary,
            }
          : {}),
        ...style,
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