import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CardProps extends Omit<PaperProps, 'variant'> {
  cardVariant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// Base Card component
export const Card = styled(Paper, {
  shouldForwardProp: (prop) => !['cardVariant', 'padding'].includes(prop as string),
})<CardProps>(({ theme, cardVariant = 'default', padding = 'md' }) => {
  const paddingMap = {
    none: 0,
    sm: theme.spacing(1),
    md: theme.spacing(2),
    lg: theme.spacing(3),
  };

  const variantStyles = {
    default: {
      elevation: 1,
      borderRadius: theme.shape.borderRadius,
    },
    elevated: {
      elevation: 3,
      borderRadius: theme.shape.borderRadius,
    },
    outlined: {
      elevation: 0,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
    flat: {
      elevation: 0,
      borderRadius: theme.shape.borderRadius,
    },
  };

  return {
    padding: paddingMap[padding],
    ...variantStyles[cardVariant],
  };
}); 