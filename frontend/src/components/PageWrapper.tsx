import React, { useEffect, ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface PageWrapperProps {
  children: ReactNode;
  backgroundColor?: string;
  scrollToTopOnMount?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  sx?: any;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  backgroundColor,
  scrollToTopOnMount = false,
  header,
  footer,
  sidebar,
  sx = {},
}) => {
  useEffect(() => {
    if (scrollToTopOnMount) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollToTopOnMount]);

  return (
    <Box
      component="main"
      role="main"
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor || 'background.default',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {header && (
        <Box sx={{ flexShrink: 0, width: '100%' }}>
          {header}
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          minHeight: 0,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {sidebar && (
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: '240px' },
              height: '100%',
            }}
          >
            {sidebar}
          </Box>
        )}

        <Container
          maxWidth={false}
          disableGutters
          sx={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: { xs: '100%', md: '100%' },
            mx: 'auto',
            px: { xs: 1, md: 2 },
            py: { xs: 1, md: 2 },
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>

      {footer && (
        <Box sx={{ flexShrink: 0, width: '100%' }}>
          {footer}
        </Box>
      )}
    </Box>
  );
}; 