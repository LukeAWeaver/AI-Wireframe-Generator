import React from 'react';
import { spacing } from '../../theme/tokens';
import { BoxPrimitive } from '../primitives/BoxPrimitive';

export interface ButtonGroupProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  gap?: keyof typeof spacing;
  style?: React.CSSProperties;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = 'horizontal',
  gap = 'md',
  style,
}) => {
  return (
    <BoxPrimitive
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap: spacing[gap],
        ...style,
      }}
    >
      {children}
    </BoxPrimitive>
  );
}; 