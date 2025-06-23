import { Box, Typography, Button, TextField, Divider } from '@mui/material';
import { useThemeContext } from '../theme/ThemeContext';
import { useUser } from '../hooks/useUser';

export const Settings = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { username, uuid } = useUser();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Settings for user {username}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Your Identifier
      </Typography>
      <TextField
        label="User ID"
        value={uuid}
        InputProps={{ readOnly: true }}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Typography variant="subtitle1" gutterBottom>
        Theme
      </Typography>
      <Button
        variant="contained"
        onClick={toggleTheme}
        sx={{ mb: 3 }}
        fullWidth
      >
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </Button>

      {/* Add more settings here as needed */}
    </Box>
  );
}; 