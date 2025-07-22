import { createTheme, ThemeOptions } from '@mui/material/styles';
import typography from './typography';
import colors from './colors';

// Design Tokens
const tokens = {
  colors,
  typography,
  shape: {
    borderRadius: 8,
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
    default: '#0d1117',
    paper: '#1a1a1a',
    elevated: '#23272f',
  },
  text: {
    primary: '#f2f2f2',
    secondary: '#cfcfcf',
    disabled: '#8e8e8e',
  },
  divider: '#23272f',
  accent: '#3b82f6',
  accentAlt: '#6366f1',
  border: '#23272f',
  borderStrong: '#2c2c2c',
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
  typography: tokens.typography as ThemeOptions['typography'],
  shape: tokens.shape,
  spacing: (factor: number) => `${factor * 8}px`,
  shadows: tokens.shadows as unknown as ThemeOptions['shadows'],
  transitions: tokens.transitions as ThemeOptions['transitions'],
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
    primary: {
      main: darkColors.accent,
      contrastText: '#f2f2f2',
    },
    secondary: {
      main: darkColors.accentAlt,
      contrastText: '#f2f2f2',
    },
  },
  components: {
    ...baseThemeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #23272f',
          backgroundColor: '#0d1117',
          color: '#f2f2f2',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 8px rgba(20,20,30,0.32)',
          border: '1px solid #23272f',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          color: '#f2f2f2',
        },
        contained: {
          backgroundColor: '#3b82f6',
          color: '#f2f2f2',
          boxShadow: 'none',
          '&:hover, &:focus': {
            backgroundColor: '#6366f1',
            color: '#f2f2f2',
          },
        },
        outlined: {
          borderColor: '#3b82f6',
          color: '#3b82f6',
          '&:hover, &:focus': {
            borderColor: '#6366f1',
            color: '#6366f1',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected, &.Mui-selected:hover, &:hover, &:focus': {
            backgroundColor: '#23272f',
            color: '#3b82f6',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 8px rgba(20,20,30,0.32)',
          borderRight: '1px solid #23272f',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #23272f',
          boxShadow: '0 2px 8px rgba(20,20,30,0.32)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#23272f',
          boxShadow: '0 2px 8px rgba(20,20,30,0.32)',
          border: '1px solid #2c2c2c',
        },
      },
    },
  },
}); 