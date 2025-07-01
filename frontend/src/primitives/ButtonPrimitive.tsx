import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface ButtonPrimitiveProps extends ButtonProps {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ButtonPrimitive = React.forwardRef<any, ButtonPrimitiveProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  }
);

ButtonPrimitive.displayName = 'ButtonPrimitive'; 