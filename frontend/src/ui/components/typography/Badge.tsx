import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface BadgeProps extends MuiBadgeProps {}

export const Badge = styled(MuiBadge)<BadgeProps>(() => ({
  // Base badge styling
}));

// Styled variant for form field descriptions
export const BadgeDescription = styled(Badge)<BadgeProps>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  marginTop: 4,
}));

// Styled variant for form field errors
export const BadgeError = styled(Badge)<BadgeProps>(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 12,
  marginTop: 4,
}));

// Styled variant for required field indicators
export const BadgeRequired = styled(Badge)<BadgeProps>(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: 8,
})); 