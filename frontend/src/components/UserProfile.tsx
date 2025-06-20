import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from '@mui/material';
import { useUser } from '../hooks/useUser';
import { validateUsername } from '../utils/validation';

export const UserProfile = () => {
  const { username, uuid, updateUserUsername, logout } = useUser();
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
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        User Profile
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Current Username
        </Typography>
        <Typography variant="h6" gutterBottom>
          {username}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          User ID
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {uuid}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        Update Username
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          label="New Username"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
            setError(null);
          }}
          error={!!error}
          helperText={error}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleUpdateUsername}
          disabled={newUsername === username}
        >
          Update
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={logout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}; 