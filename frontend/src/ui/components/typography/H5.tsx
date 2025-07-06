import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const H5 = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  lineHeight: theme.typography.h5.lineHeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  margin: 0,
}));

H5.defaultProps = {
  component: 'h5',
}; 