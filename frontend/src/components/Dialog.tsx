import React from 'react';
import { DialogPrimitive, DialogPrimitiveProps } from '../primitives/DialogPrimitive';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export interface DialogProps extends DialogPrimitiveProps {}

export const Dialog = (props: DialogProps) => {
  const theme = useTheme();

  if (!props.open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Backdrop */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Dialog content */}
      <DialogPrimitive
        {...props}
        style={{
          position: 'relative',
          zIndex: 2,
          background: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[8],
          padding: theme.spacing(4),
          minWidth: 320,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          ...props.style,
        }}
      >
        {props.children}
      </DialogPrimitive>
    </Box>
  );
}; 