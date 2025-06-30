import React from 'react';
import { TooltipPrimitive, TooltipPrimitiveProps } from '../primitives/TooltipPrimitive';
import { getTheme } from '../../theme/theme';

export interface TooltipProps extends TooltipPrimitiveProps {
  mode?: 'light' | 'dark';
}

export const Tooltip: React.FC<TooltipProps> = ({
  mode = 'light',
  content,
  children,
  position = 'top',
  ...props
}) => {
  const theme = getTheme(mode);

  const tooltipContent = (
    <div
      style={{
        background: theme.colors.surface,
        color: theme.colors.text,
        padding: theme.spacing.sm,
        borderRadius: theme.radii.md,
        boxShadow: theme.shadows.md,
        fontSize: theme.fontSizes.sm,
        maxWidth: 250,
        wordWrap: 'break-word',
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {content}
    </div>
  );

  return (
    <TooltipPrimitive
      content={tooltipContent}
      position={position}
      {...props}
    >
      {children}
    </TooltipPrimitive>
  );
}; 