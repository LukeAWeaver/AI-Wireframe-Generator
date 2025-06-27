import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { useRightSidebar } from './RightSidebarContext';

interface IPageWrapperProps {
  children: ReactNode;
  sidebarLeft?: ReactNode;
  footer?: ReactNode;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
}

export const PageWrapper: React.FC<IPageWrapperProps> = ({
  children,
  sidebarLeft,
  footer,
  backgroundColor,
  sx = {},
}) => {
  const { sidebarContent } = useRightSidebar();

  return (
    <Box
      component="main"
      role="main"
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor || 'background.default',
        ...sx,
      }}
    >
      {/* Main horizontal flex area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
        {/* Left Sidebar */}
        {sidebarLeft && (
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
            {sidebarLeft}
          </Box>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: { xs: 1, md: 2 },
            py: { xs: 1, md: 2 },
          }}
        >
          {children}
        </Box>

        {/* Right Sidebar (dynamic from context) */}
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
      </Box>

      {/* Footer pinned at the bottom */}
      {footer && (
        <Box
          sx={{
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
            backgroundColor: 'background.paper',
          }}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
}; 