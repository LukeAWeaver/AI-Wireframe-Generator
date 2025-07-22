import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface FormCardProps extends Omit<CardProps, 'cardVariant' | 'padding'> {
  maxWidth?: number;
}

export const FormCard = styled(Card)<FormCardProps>(({ theme, maxWidth = 600 }) => ({
  maxWidth,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  elevation: 3,
})); 