import { createTheme, ThemeOptions } from '@mui/material/styles';

// Design Tokens
const tokens = {
  colors: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      elevated: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.2)',
    '0px 8px 16px rgba(0, 0, 0, 0.2)',
    '0px 16px 24px rgba(0, 0, 0, 0.2)',
    '0px 24px 32px rgba(0, 0, 0, 0.2)',
    '0px 32px 40px rgba(0, 0, 0, 0.2)',
    '0px 40px 48px rgba(0, 0, 0, 0.2)',
    '0px 48px 56px rgba(0, 0, 0, 0.2)',
    '0px 56px 64px rgba(0, 0, 0, 0.2)',
    '0px 64px 72px rgba(0, 0, 0, 0.2)',
    '0px 72px 80px rgba(0, 0, 0, 0.2)',
    '0px 80px 88px rgba(0, 0, 0, 0.2)',
    '0px 88px 96px rgba(0, 0, 0, 0.2)',
    '0px 96px 104px rgba(0, 0, 0, 0.2)',
    '0px 104px 112px rgba(0, 0, 0, 0.2)',
    '0px 112px 120px rgba(0, 0, 0, 0.2)',
    '0px 120px 128px rgba(0, 0, 0, 0.2)',
    '0px 128px 136px rgba(0, 0, 0, 0.2)',
    '0px 136px 144px rgba(0, 0, 0, 0.2)',
    '0px 144px 152px rgba(0, 0, 0, 0.2)',
    '0px 152px 160px rgba(0, 0, 0, 0.2)',
    '0px 160px 168px rgba(0, 0, 0, 0.2)',
    '0px 168px 176px rgba(0, 0, 0, 0.2)',
    '0px 176px 184px rgba(0, 0, 0, 0.2)',
    '0px 184px 192px rgba(0, 0, 0, 0.2)',
    '0px 192px 200px rgba(0, 0, 0, 0.2)',
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};

// Light theme colors
const lightColors = {
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
    elevated: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Dark theme colors
const darkColors = {
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    elevated: '#2d2d2d',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
};

// Base theme configuration
const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    error: tokens.colors.error,
    warning: tokens.colors.warning,
    info: tokens.colors.info,
    success: tokens.colors.success,
  },
  typography: tokens.typography as any,
  shape: tokens.shape,
  spacing: (factor: number) => `${factor * 4}px`,
  shadows: tokens.shadows as any,
  transitions: tokens.transitions,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#959595',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.shape.borderRadius,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: tokens.shape.borderRadius,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: tokens.shape.borderRadius,
        },
      },
    },
  },
};

// Create light theme
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: 'light',
    background: lightColors.background,
    text: lightColors.text,
    divider: lightColors.divider,
  },
});

// Create dark theme
export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    ...baseThemeOptions.palette,
    mode: 'dark',
    background: darkColors.background,
    text: darkColors.text,
    divider: darkColors.divider,
  },
});

// Export tokens for use in other files
export { tokens }; 