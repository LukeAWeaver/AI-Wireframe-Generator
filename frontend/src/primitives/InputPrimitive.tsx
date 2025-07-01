import React from 'react';

export interface InputPrimitiveProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputPrimitive = React.forwardRef<HTMLInputElement, InputPrimitiveProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

InputPrimitive.displayName = 'InputPrimitive'; 