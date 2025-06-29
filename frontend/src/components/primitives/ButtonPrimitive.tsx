import React from 'react';

export interface ButtonPrimitiveProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonPrimitive = React.forwardRef<HTMLButtonElement, ButtonPrimitiveProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

ButtonPrimitive.displayName = 'ButtonPrimitive'; 