import { useState } from 'react';
import { Box, Typography, Button, TextField, Divider } from '@mui/material';
import { useThemeContext } from '../theme/ThemeContext';
import { useUser } from '../hooks/useUser';
import { validateUsername } from '../utils/validation';

export const Settings = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { username, uuid, updateUserUsername } = useUser();
  const [newUsername, setNewUsername] = useState(username || '');
  const [error, setError] = useState<string | null>(null);

  const handleUpdateUsername = () => {
    const validation = validateUsername(newUsername);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid username');
      return;
    }
    updateUserUsername(newUsername);
    setError(null);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Settings
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

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Update Username
      </Typography>
      <TextField
        label="New Username"
        value={newUsername}
        onChange={e => {
          setNewUsername(e.target.value);
          setError(null);
        }}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={handleUpdateUsername}
        disabled={newUsername === username}
        fullWidth
      >
        Update Username
      </Button>
    </Box>
  );
}; 