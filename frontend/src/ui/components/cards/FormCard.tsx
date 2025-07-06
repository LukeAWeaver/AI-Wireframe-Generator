import { Card, CardProps } from './Card';
import { styled } from '@mui/material/styles';

export interface FormCardProps extends Omit<CardProps, 'cardVariant' | 'padding'> {
  maxWidth?: number;
}

// Card for forms (login, profile, settings)
export const FormCard = styled(Card)<FormCardProps>(({ theme, maxWidth = 600 }) => ({
  maxWidth,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  elevation: 3,
})); 