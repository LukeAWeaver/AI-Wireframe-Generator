import { Card, CardProps } from './Card';
import { styled } from '@mui/material/styles';

export interface ContentCardProps extends Omit<CardProps, 'cardVariant' | 'padding'> {
  flex?: boolean;
  minHeight?: number;
}

// Card for content sections (wireframe panels, info sections)
export const ContentCard = styled(Card)<ContentCardProps>(({ theme, flex = false, minHeight }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  ...(flex && {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  ...(minHeight && {
    minHeight,
  }),
})); 