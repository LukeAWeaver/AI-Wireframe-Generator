import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H1 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  lineHeight: theme.typography.h1.lineHeight,
  letterSpacing: theme.typography.h1.letterSpacing,
  margin: 0,
}));

H1.defaultProps = {
  component: 'h1',
}; 