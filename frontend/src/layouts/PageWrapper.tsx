import { ReactNode } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { useRightSidebar, useThemeContext } from '@contexts';

interface IPageWrapperProps {
  children: ReactNode;
  sidebarLeft?: ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

export const PageWrapper = ({
  children,
  sidebarLeft,
  footer,
  backgroundColor,
  sx,
}: IPageWrapperProps) => {
  const { sidebarContent } = useRightSidebar();
  const { isDarkMode } = useThemeContext();
  // const theme = useTheme();

  const isNarrowForSidebar = useMediaQuery('(max-width:1050px)');
  const isMobile = useMediaQuery('(max-width:740px)');

  const gradientBackground =
    backgroundColor ??
    (isDarkMode
      ? 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'
      : 'linear-gradient(135deg, rgba(0, 241, 254, 0.09), rgba(127, 127, 213, 0.53), rgba(194, 110, 146, 0.26))');

  return (
    <Box
      component="main"
      sx={{
        background: gradientBackground,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Main horizontal flex area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
        {/* Left Sidebar */}
        {sidebarLeft && !isMobile && (
          <Box
            sx={{
              width: '12rem',
              flexShrink: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {sidebarLeft}
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
            py: { xs: '0.5rem', md: '1rem' },
          }}
        >
          {children}
        </Box>

        {/* Right Sidebar */}
        {sidebarContent && !isNarrowForSidebar && (
          <Box
            sx={{
              width: '15rem',
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

      {/* Bottom Navigation (on mobile only) */}
      {sidebarLeft && isMobile && (
        <Box
          sx={{
            width: '100%',
            height: '3rem',
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: gradientBackground,
          }}
        >
          {sidebarLeft}
        </Box>
      )}

      {/* Optional Footer */}
      {footer && !isMobile && (
        <Box
          sx={{
            width: '100%',
            flexShrink: 0,
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
};
