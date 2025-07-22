import { useState } from 'react';
import { Typography } from '@mui/material';
import { useUser } from '@hooks/useUser';
import { validateUsername } from '@utils/validation';
import { createUser, IUserResponse } from '@services/api';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import { FormCard } from '@components/FormCard';
import { Text } from '@primitives/Text';

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
      const userData: IUserResponse = await createUser(username);
      setUserData(userData.username, userData.uuid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard maxWidth={400}>
      <Typography variant="h5" component="h1" gutterBottom>
        Set Your Username
      </Typography>
      <Text variant='body2' sx={{ mb: 3 }}>
        Please choose a username to get started. This will be your unique identifier.
      </Text>
      <form onSubmit={(e) => { void handleSubmit(e); }} style={{ marginTop: 16 }}>
        <InputField
          label="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setUsername(e.target.value);
            setError(null);
          }}
          error={error || undefined}
          required
          autoComplete="off"
          id="login-username"
        />
        <Button
          variant="contained"
          onClick={e => { void handleSubmit(e); }}
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </FormCard>
  );
}; 