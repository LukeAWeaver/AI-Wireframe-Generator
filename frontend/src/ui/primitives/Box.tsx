import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export interface BoxProps extends MuiBoxProps {}

export const Box = (props: BoxProps) => {
  return <MuiBox {...props} />;
}; 