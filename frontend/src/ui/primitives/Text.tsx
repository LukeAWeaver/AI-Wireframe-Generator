import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TextProps extends MuiTypographyProps {}

export const Text = (props: TextProps) => {
  return <MuiTypography {...props} />;
}; 