import React, { useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';

export interface DialogPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocusRef?: React.RefObject<HTMLElement>;
}

export const DialogPrimitive = React.forwardRef<HTMLDivElement, DialogPrimitiveProps>(
  ({ open, onClose, children, initialFocusRef, ...props }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Use useImperativeHandle to properly handle the ref
    useImperativeHandle(ref, () => dialogRef.current!, []);

    // Focus trap: keep focus inside dialog
    useEffect(() => {
      if (!open) return;
      const node = dialogRef.current;
      if (!node) return;
      // Focus the initial focus ref or the dialog itself
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else {
        node.focus();
      }
      // Trap focus
      const handleFocus = (e: FocusEvent) => {
        if (!node.contains(e.target as Node)) {
          e.stopPropagation();
          node.focus();
        }
      };
      document.addEventListener('focus', handleFocus, true);
      return () => {
        document.removeEventListener('focus', handleFocus, true);
      };
    }, [open, initialFocusRef]);

    // Escape key closes dialog
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onClose();
        }
        if (props.onKeyDown) props.onKeyDown(e);
      },
      [onClose, props]
    );

    if (!open) return null;

    return (
      <Box
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...props}
        onKeyDown={handleKeyDown}
      >
        {children}
      </Box>
    );
  }
);

DialogPrimitive.displayName = 'DialogPrimitive'; 