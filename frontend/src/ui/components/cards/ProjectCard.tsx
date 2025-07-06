import { Card, CardProps } from './Card';
import { styled } from '@mui/material/styles';

export interface ProjectCardWrapperProps extends Omit<CardProps, 'cardVariant' | 'padding'> {
  isFlipped?: boolean;
  isSelected?: boolean;
}

// Card wrapper for project cards with flip animation
export const ProjectCardWrapper = styled(Card)<ProjectCardWrapperProps>(({ theme, isFlipped, isSelected }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  top: 0,
  left: 0,
  padding: theme.spacing(2),
  transition: 'transform 0.6s ease-in-out',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  ...(isSelected && {
    cursor: 'pointer',
  }),
})); 