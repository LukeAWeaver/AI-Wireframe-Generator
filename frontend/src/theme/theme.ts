import { colors, spacing, radii, fontSizes, shadows } from './tokens';

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode) => ({
  colors: colors[mode],
  spacing,
  radii,
  fontSizes,
  shadows,
  mode,
});

// Simple styled utility for inline styles
export const styled = <T extends React.CSSProperties>(styles: T): T => styles;

// Simple css utility for emotion/styled-components usage
export const css = (styles: React.CSSProperties) => styles; 