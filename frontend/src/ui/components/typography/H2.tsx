import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H2 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  lineHeight: theme.typography.h2.lineHeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  margin: 0,
}));

H2.defaultProps = {
  component: 'h2',
}; 