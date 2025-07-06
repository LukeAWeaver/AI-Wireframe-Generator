import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Caption = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.caption.fontWeight,
  lineHeight: theme.typography.caption.lineHeight,
  letterSpacing: theme.typography.caption.letterSpacing,
  margin: 0,
}));

Caption.defaultProps = {
  component: 'span',
}; 