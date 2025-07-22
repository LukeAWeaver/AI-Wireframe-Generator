import React from 'react';
import { Input } from '@components/Input';
import { Box } from '@components/Box';
import { FormLabel } from '@mui/material';
import { Text } from '@primitives/Text';
import { Stack } from '@primitives/Stack';

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
        <FormLabel htmlFor={inputId}>
          <Stack direction="row" alignItems="center" gap={1}>
          {label}
          {required && <Text color="red" display={"inline-block"}>*</Text>}
          </Stack>
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
        <Text id={descId}>{description}</Text>
      )}
      
      {error && (
        <Text id={errorId}>{error}</Text>
      )}
    </Box>
  );
}; 