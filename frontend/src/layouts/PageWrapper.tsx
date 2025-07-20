import { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { useRightSidebar, useThemeContext } from '@contexts';

interface IPageWrapperProps {
  children: ReactNode;
  sidebarLeft?: ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

export const PageWrapper = (props: IPageWrapperProps) => {
  const { sidebarContent } = useRightSidebar();
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Custom media queries for nav and sidebar
  const isNarrowForSidebar = useMediaQuery('(max-width:1050px)');
  const isBottomNav = useMediaQuery('(max-width:740px)');
  const isNarrowForLeftSidebar = useMediaQuery('(max-width:740px)');

  return (
    <Box
      component="main"
      sx={{
        background: isDarkMode 
        ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
        : 'linear-gradient(135deg,rgba(0, 241, 254, 0.09),rgba(127, 127, 213, 0.53),rgba(194, 110, 146, 0.26))',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...props.sx,
      }}
    >
      {/* Main horizontal flex area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
        {/* Left Sidebar - only on desktop and not on narrow screens */}
        {props.sidebarLeft && !isNarrowForLeftSidebar && !isMobile && (
          <Box
            sx={{
              width: '12rem', // 240px -> 12rem
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {props.sidebarLeft}
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flex: '1 1 0%',
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: { xs: 0, md: 0 },
            py: { xs: '0.5rem', md: '1rem' }, // 1 = 0.5rem, 2 = 1rem
          }}
        >
          {props.children}
        </Box>

        {/* Right Sidebar (dynamic from context) - only when width >= 1050px */}
        {sidebarContent && !isNarrowForSidebar && (
          <Box
            sx={{
              width: '15rem', // 300px -> 15rem
              flexShrink: 0,
              borderLeft: '1px solid',
              borderColor: 'divider',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {sidebarContent}
          </Box>
        )}
      </Box>

      {/* Mobile Bottom Navigation - show when width <= 740px */}
      {props.sidebarLeft && isBottomNav && (
        <Box
          sx={{
            width: '100%',
            height: '3rem', // 60px -> 3rem
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 1200,
            background: isDarkMode 
              ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
              : 'linear-gradient(135deg,rgba(0, 241, 254, 0.09),rgba(127, 127, 213, 0.53),rgba(194, 110, 146, 0.26))',
          }}
        >
          {props.sidebarLeft}
        </Box>
      )}

      {/* Footer pinned at the bottom */}
      {/* {props.footer && !isMobile && (
        <Box
          sx={{
            width: '100%',
            flexShrink: 0,
          }}
        >
          {props.footer}
        </Box>
      )} */}
    </Box>
  );
};