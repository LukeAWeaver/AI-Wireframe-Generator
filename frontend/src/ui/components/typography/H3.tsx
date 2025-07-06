import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H3 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  lineHeight: theme.typography.h3.lineHeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  margin: 0,
}));

H3.defaultProps = {
  component: 'h3',
}; 