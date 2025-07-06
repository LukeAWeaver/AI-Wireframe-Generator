import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for project purpose text
export const ProjectPurpose = styled(Typography)<TypographyProps>(() => ({
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 16,
}));

// Styled component for project description text
export const ProjectDescription = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  marginBottom: 24,
  maxWidth: 320,
})); 