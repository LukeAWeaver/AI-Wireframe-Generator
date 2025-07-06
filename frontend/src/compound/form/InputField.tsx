import React from 'react';
import { Input } from '@components/Input';
import { Box } from '@components/Box';
import { BadgeRequired, BadgeDescription, BadgeError, FormLabel } from '@ui/components/typography';
import { useTheme } from '@mui/material';

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

  const theme = useTheme();
  const generatedId = React.useId();
  const inputId = props.id || generatedId;
  const descId = description ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <Box spacing="sm">
      {label && (
        <FormLabel htmlFor={inputId}>
          {label}
          {required && <BadgeRequired>*</BadgeRequired>}
        </FormLabel>
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
        <BadgeDescription id={descId}>{description}</BadgeDescription>
      )}
      
      {error && (
        <BadgeError id={errorId}>{error}</BadgeError>
      )}
    </Box>
  );
}; 