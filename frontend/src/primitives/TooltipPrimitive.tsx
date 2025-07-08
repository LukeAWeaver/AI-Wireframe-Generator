import React from 'react';
import MuiTooltip from '@mui/material/Tooltip';

export interface TooltipPrimitiveProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
  componentsProps?: any;
}

export const TooltipPrimitive = React.forwardRef<HTMLDivElement, TooltipPrimitiveProps>(
  ({ content, children, position = 'top', delay = 300, disabled = false, componentsProps, ...props }, ref) => {
    return (
      <MuiTooltip
        title={content}
        placement={position}
        enterDelay={delay}
        disableHoverListener={disabled}
        disableFocusListener={disabled}
        disableTouchListener={disabled}
        componentsProps={componentsProps}
        {...props}
      >
        <span ref={ref}>{children}</span>
      </MuiTooltip>
    );
  }
);

TooltipPrimitive.displayName = 'TooltipPrimitive'; 