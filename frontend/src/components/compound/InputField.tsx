import React from 'react';
import { Input } from '../styled/Input';
import { BoxPrimitive } from '../primitives/BoxPrimitive';
import { Badge } from '../styled/Badge';

export interface InputFieldProps {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: string[];
  [key: string]: any;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  description,
  error,
  required,
  multiline,
  rows,
  select,
  options,
  ...inputProps
}) => {
  // Generate a unique id if not provided
  const inputId = id || React.useId();
  const descId = description ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const ariaDescribedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <BoxPrimitive style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label htmlFor={inputId} style={{ marginBottom: 4, fontWeight: 500 }}>
        {label}
        {required && <Badge style={{ color: 'red', marginLeft: 2 }}>*</Badge>}
      </label>
      <Input
        id={inputId}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        required={required}
        multiline={multiline}
        rows={rows}
        select={select}
        options={options}
        {...inputProps}
      />
      {error ? (
        <Badge id={errorId} style={{ color: 'red', fontSize: 12, marginTop: 2 }}>{error}</Badge>
      ) : description ? (
        <Badge id={descId} style={{ color: '#666', fontSize: 12, marginTop: 2 }}>{description}</Badge>
      ) : null}
    </BoxPrimitive>
  );
}; 