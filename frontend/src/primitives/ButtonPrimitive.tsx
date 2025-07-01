import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface ButtonPrimitiveProps extends ButtonProps {}

export const ButtonPrimitive = React.forwardRef<
  React.ComponentPropsWithRef<typeof Button>["ref"],
  ButtonPrimitiveProps
>((props, ref) => {
  return <Button ref={ref} {...props} />;
});

ButtonPrimitive.displayName = 'ButtonPrimitive'; 