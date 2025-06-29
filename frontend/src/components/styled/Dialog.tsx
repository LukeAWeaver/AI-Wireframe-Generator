import React from 'react';
import { DialogPrimitive, DialogPrimitiveProps } from '@primitives/DialogPrimitive';
import { getTheme } from '../../theme/theme';

export interface DialogProps extends DialogPrimitiveProps {
  mode?: 'light' | 'dark';
}

export const Dialog: React.FC<DialogProps> = ({
  mode = 'light',
  children,
  ...props
}) => {
  const theme = getTheme(mode);

  if (!props.open) return null;

  return (
    <div
      style={{
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
      <div
        style={{
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
          background: theme.colors.surface,
          borderRadius: theme.radii.lg,
          boxShadow: theme.shadows.lg,
          padding: theme.spacing.lg,
          minWidth: 320,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          ...props.style,
        }}
      >
        {children}
      </DialogPrimitive>
    </div>
  );
}; 