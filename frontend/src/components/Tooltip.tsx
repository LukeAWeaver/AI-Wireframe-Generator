import { TooltipPrimitive, TooltipPrimitiveProps } from '../primitives/TooltipPrimitive';
import { useTheme } from '@mui/material/styles';

export interface TooltipProps extends TooltipPrimitiveProps {
  mode?: 'light' | 'dark';
}

export const Tooltip = (props: TooltipProps) => {
  const theme = useTheme();

  const tooltipContent = props.content;

  return (
    <TooltipPrimitive
      content={tooltipContent}
      position={props.position}
      delay={props.delay}
      disabled={props.disabled}
      componentsProps={{
        tooltip: {
          sx: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            p: 1,
            borderRadius: 1,
            boxShadow: 3,
            fontSize: theme.typography.body2.fontSize,
            maxWidth: 250,
            wordWrap: 'break-word',
            border: `1px solid ${theme.palette.divider}`,
            zIndex: 9999,
          },
        },
      }}
      {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'content' && key !== 'position' && key !== 'delay' && key !== 'disabled'))}
    >
      {props.children}
    </TooltipPrimitive>
  );
}; 