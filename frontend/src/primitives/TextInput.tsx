import { TextField, TextFieldProps } from '@mui/material';

export const TextInput = (props: TextFieldProps) => {
  return (
    <TextField
      multiline
      fullWidth
      minRows={3}
      variant="outlined"
      InputProps={{
        sx: {
          fontSize: 24,
          py: 2,
          ...props.InputProps?.sx,
        },
        ...props.InputProps,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          fontSize: 24,
          py: 2,
          '& fieldset': {
            borderWidth: 2,
            borderColor: (theme) => theme.palette.divider,
          },
          '&:hover fieldset': {
            borderColor: (theme) => theme.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: (theme) => theme.palette.primary.main,
          },
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};
