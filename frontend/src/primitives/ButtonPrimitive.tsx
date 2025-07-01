import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface ButtonPrimitiveProps extends ButtonProps {}

export const ButtonPrimitive = React.forwardRef<any, ButtonPrimitiveProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  }
);

ButtonPrimitive.displayName = 'ButtonPrimitive'; 