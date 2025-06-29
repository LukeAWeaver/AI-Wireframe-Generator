import React from 'react';
import { Input, InputProps } from '../styled/Input';

export interface InputFieldProps extends Omit<InputProps, 'id'> {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  select?: boolean;
  options?: string[];
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label htmlFor={inputId} style={{ marginBottom: 4, fontWeight: 500 }}>
        {label}
        {required && <span aria-hidden="true" style={{ color: 'red', marginLeft: 2 }}>*</span>}
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
        <div id={errorId} style={{ color: 'red', fontSize: 12, marginTop: 2 }}>{error}</div>
      ) : description ? (
        <div id={descId} style={{ color: '#666', fontSize: 12, marginTop: 2 }}>{description}</div>
      ) : null}
    </div>
  );
}; 