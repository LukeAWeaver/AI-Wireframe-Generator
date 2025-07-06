import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H6 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  lineHeight: theme.typography.h6.lineHeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  margin: 0,
}));

H6.defaultProps = {
  component: 'h6',
}; 