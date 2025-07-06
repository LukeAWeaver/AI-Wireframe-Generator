import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H4 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  lineHeight: theme.typography.h4.lineHeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  margin: 0,
}));

H4.defaultProps = {
  component: 'h4',
}; 