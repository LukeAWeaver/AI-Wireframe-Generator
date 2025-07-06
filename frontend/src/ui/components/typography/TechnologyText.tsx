import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for technology description text
export const TechnologyDescription = styled(Typography)<TypographyProps>(() => ({
  fontSize: 12,
  opacity: 0.8,
}));

// Styled component for technology category text
export const TechnologyCategory = styled(Typography)<TypographyProps>(() => ({
  fontSize: 11,
  opacity: 0.6,
  marginTop: 4,
})); 