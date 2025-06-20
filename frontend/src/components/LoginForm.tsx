import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
import { useUser } from '../hooks/useUser';
import { validateUsername } from '../utils/validation';
import { createUser } from '../utils/api';

export const LoginForm = () => {
  const { setUserData } = useUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateUsername(username);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid username');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userData = await createUser(username);
      setUserData(userData.username, userData.uuid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome! Set Your Username
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Please choose a username to get started. This will be your unique identifier.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
          error={!!error}
          helperText={error}
          disabled={isLoading}
          sx={{ mb: 2 }}
          autoComplete="off"
          inputProps={{
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            'aria-autocomplete': 'none'
          }}
        />
        <Button 
          fullWidth 
          variant="contained" 
          type="submit"
          disabled={!username || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Creating Account...' : 'Get Started'}
        </Button>
      </Box>
    </Paper>
  );
}; 