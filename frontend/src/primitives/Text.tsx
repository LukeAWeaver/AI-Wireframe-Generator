import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledText = styled(Typography)<TypographyProps>(() => ({}));

export const Text = (props: TypographyProps) => {
  return <StyledText {...props} />;
};
