import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for profile field labels
export const ProfileFieldLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 16,
}));

// Styled component for user ID display
export const UserIdDisplay = styled(Typography)<TypographyProps>(() => ({
  fontFamily: 'monospace',
})); 