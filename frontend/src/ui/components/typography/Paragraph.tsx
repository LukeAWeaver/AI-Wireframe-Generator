import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Paragraph = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  letterSpacing: theme.typography.body1.letterSpacing,
  margin: 0,
}));

Paragraph.defaultProps = {
  component: 'p',
}; 