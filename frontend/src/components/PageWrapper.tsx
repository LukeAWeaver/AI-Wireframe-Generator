import React, { useEffect, ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface PageWrapperProps {
  children: ReactNode;
  maxWidth?: number | string;
  padding?: number | string;
  backgroundColor?: string;
  scrollToTopOnMount?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  sx?: any;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  maxWidth = 1024,
  padding = 2,
  backgroundColor,
  scrollToTopOnMount = false,
  header,
  footer,
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor || 'background.default',
        overflowY: 'auto',
        ...sx,
      }}
    >
      {header && (
        <Box sx={{ flexShrink: 0 }}>
          {header}
        </Box>
      )}
      
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
          mx: 'auto',
          px: typeof padding === 'number' ? padding : padding,
          py: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </Container>

      {footer && (
        <Box sx={{ flexShrink: 0 }}>
          {footer}
        </Box>
      )}
    </Box>
  );
}; 