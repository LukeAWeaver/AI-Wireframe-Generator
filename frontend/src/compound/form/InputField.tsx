import React from 'react';
import { Input } from '@components/Input';
import { Box } from '@components/Box';
import { Badge } from '@components/Badge';

export interface InputFieldProps {
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  [key: string]: unknown;
}

export const InputField = (props: InputFieldProps) => {
  const {
    label,
    description,
    error,
    required,
    value,
    onChange,
    ...inputProps
  } = props;

  const generatedId = React.useId();
  const inputId = props.id || generatedId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <Box spacing="sm">
      {label && (
        <label htmlFor={inputId} style={{ marginBottom: 4, fontWeight: 500 }}>
          {label}
          {required && <Badge style={{ color: 'error.main', marginLeft: 8 }}>*</Badge>}
        </label>
      )}
      
      <Input
        id={inputId}
        value={value}
        onChange={onChange}
        aria-describedby={description ? descId : error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        fullWidth
        {...inputProps}
      />
      
      {description && (
        <Badge id={descId} style={{ color: 'text.secondary', fontSize: 12, marginTop: 4 }}>{description}</Badge>
      )}
      
      {error && (
        <Badge id={errorId} style={{ color: 'error.main', fontSize: 12, marginTop: 4 }}>{error}</Badge>
      )}
    </Box>
  );
}; 