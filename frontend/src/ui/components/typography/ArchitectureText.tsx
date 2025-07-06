import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for architecture main heading
export const ArchitectureHeading = styled(Typography)<TypographyProps>(() => ({
  marginBottom: 16,
}));

// Styled component for architecture description text
export const ArchitectureDescription = styled(Typography)<TypographyProps>(({ theme }) => ({
  maxWidth: 900,
  margin: '16px auto 0',
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  textAlign: 'center',
}));

// Styled component for architecture purpose text
export const ArchitecturePurpose = styled(Typography)<TypographyProps>(({ theme }) => ({
  maxWidth: 900,
  margin: '24px auto 0',
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  textAlign: 'center',
})); 