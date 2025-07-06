import { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { useRightSidebar } from '@contexts';

interface IPageWrapperProps {
  children: ReactNode;
  sidebarLeft?: ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

export const PageWrapper = (props: IPageWrapperProps) => {
  const { sidebarContent } = useRightSidebar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: props.backgroundColor || 'background.default',
        ...props.sx,
      }}
    >
      {/* Main horizontal flex area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
        {/* Left Sidebar - only on desktop */}
        {props.sidebarLeft && !isMobile && (
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              borderRight: '1px solid',
              borderColor: 'divider',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper',
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
            py: { xs: 1, md: 2 },
          }}
        >
          {props.children}
        </Box>

        {/* Right Sidebar (dynamic from context) - only on desktop */}
        {sidebarContent && !isMobile && (
          <Box
            sx={{
              width: 300,
              flexShrink: 0,
              borderLeft: '1px solid',
              borderColor: 'divider',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper',
            }}
          >
            {sidebarContent}
          </Box>
        )}
      </Box>

      {/* Mobile Bottom Navigation - only on mobile */}
      {props.sidebarLeft && isMobile && (
        <Box
          sx={{
            width: '100%',
            height: 60,
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.sidebarLeft}
        </Box>
      )}

      {/* Footer pinned at the bottom */}
      {props.footer && (
        <Box
          sx={{
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
            backgroundColor: 'background.paper',
          }}
        >
          {props.footer}
        </Box>
      )}
    </Box>
  );
}; 