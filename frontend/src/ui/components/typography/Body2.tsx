import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Body2 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.body2.fontWeight,
  lineHeight: theme.typography.body2.lineHeight,
  letterSpacing: theme.typography.body2.letterSpacing,
  margin: 0,
}));

Body2.defaultProps = {
  component: 'p',
};

// Styled variant for descriptions with better line height and justification
export const Body2Description = styled(Body2)<TypographyProps>(({ theme }) => ({
  lineHeight: 1.5,
  textAlign: 'justify',
}));

Body2Description.defaultProps = {
  component: 'p',
  color: 'textSecondary',
}; 