import { Typography, Button, TextField, Divider, Stack } from '@mui/material';
import { useState } from 'react';
import { useThemeContext, useTutorialsContext } from '@contexts';
import { useUser } from '@hooks/useUser';
import { Dialog } from '@components/Dialog';
import { validateUsername } from '@utils/validation';
import { FormCard } from '@components/FormCard';
import { persistor, useAppDispatch } from '../../../store/store';

export const SettingsPanel = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { resetTutorialsState } = useTutorialsContext();
  const { username, uuid, updateUserUsername } = useUser();
  useAppDispatch();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [newUsername, setNewUsername] = useState(username || '');
  const [error, setError] = useState<string | null>(null);

  const handleResetAppState = async () => {
    await persistor.purge();
    resetTutorialsState();
    setShowResetDialog(false);
  };

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
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} width="100%" justifyContent={"center"} alignItems="center">
      <FormCard maxWidth={400} sx={{ flex: 1, width: '100%' }}>
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
          Update Username
        </Typography>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
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
        </div>
      </FormCard>
      <FormCard maxWidth={400} sx={{ flex: 1, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          General
        </Typography>
        <Divider sx={{ my: 2 }} />
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
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1" gutterBottom>
          App Management
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setShowResetDialog(true)}
          sx={{ mb: 3 }}
          fullWidth
        >
          Reset App State
        </Button>
        <Dialog
          open={showResetDialog}
          onClose={() => setShowResetDialog(false)}
        >
          <Typography variant="h6" gutterBottom>
            Reset App State
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to reset the app state? This will clear all user data, settings, and return the app to its initial state. This action cannot be undone.
          </Typography>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button
              variant="text"
              onClick={() => setShowResetDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => { void handleResetAppState(); }}
            >
              Reset
            </Button>
          </div>
        </Dialog>
      </FormCard>
    </Stack>
  );
}; 