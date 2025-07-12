// Design tokens for the design system

export const colors = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    primary: '#1976d2',
    secondary: '#9c27b0',
    error: '#d32f2f',
    text: '#222222',
    textSecondary: '#555555',
    border: '#e0e0e0',
    onPrimary: '#ffffff',
  },
  dark: {
    background: '#0d1117',
    surface: '#1a1a1a',
    surfaceAlt: '#23272f',
    surfaceMuted: '#2c2c2c',
    primary: '#3b82f6',
    secondary: '#6366f1',
    error: '#ef9a9a',
    text: '#f2f2f2',
    textBody: '#cfcfcf',
    textMuted: '#8e8e8e',
    border: '#23272f',
    borderStrong: '#2c2c2c',
    onPrimary: '#0d1117',
  },
};

export const spacing = {
  xs: '0.2rem', // 4px -> 0.2rem (1rem = 20px at 125% zoom)
  sm: '0.4rem', // 8px -> 0.4rem
  md: '0.8rem', // 16px -> 0.8rem
  lg: '1.2rem', // 24px -> 1.2rem
  xl: '1.6rem', // 32px -> 1.6rem
};

export const radii = {
  sm: '2px',
  md: '6px',
  lg: '12px',
  pill: '9999px',
  circle: '50%',
};

export const fontSizes = {
  xs: '0.6rem', // 12px -> 0.6rem
  sm: '0.7rem', // 14px -> 0.7rem
  md: '0.8rem', // 16px -> 0.8rem
  lg: '1rem',   // 20px -> 1rem
  xl: '1.4rem', // 28px -> 1.4rem
  display: '2rem', // 40px -> 2rem
};
// [REVIEW] If the base html font-size is not 20px, these rem values may need further adjustment for perfect scaling.

export const shadows = {
  sm: '0 1px 2px rgba(20,20,30,0.25)',
  md: '0 2px 8px rgba(20,20,30,0.32)',
  lg: '0 4px 16px rgba(20,20,30,0.40)',
}; 