import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { useUser } from '@hooks/useUser';
import { validateUsername } from '@utils/validation';
import { ProfileFieldLabel, UserIdDisplay, ContentCard } from '@ui/components';
import { Box } from '@components/Box';

export const UserProfilePanel = () => {
  const { username, uuid, build_count, updateUserUsername, logout } = useUser();
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
    <Stack 
    direction="row"
    spacing={2}
    flexWrap="wrap"
    alignItems="center"
    justifyContent={"space-evenly"}
    style={{width: "100%"}}>
        <ContentCard>
          <Typography variant="h5" component="h1" gutterBottom>
            User Profile
          </Typography>
          
          <Box style={{marginTop: 3, marginBottom: 8}}>
            <ProfileFieldLabel variant="subtitle1">
              Current Username
            </ProfileFieldLabel>
            <Typography variant="h6" gutterBottom>
              {username}
            </Typography>

            <ProfileFieldLabel variant="subtitle1">
              User ID
            </ProfileFieldLabel>
            <UserIdDisplay variant="body2">
              {uuid}
            </UserIdDisplay>

            <ProfileFieldLabel variant="subtitle1">
              Build Count
            </ProfileFieldLabel>
            <Typography variant="h6" gutterBottom>
              {build_count || 0}
            </Typography>
          </Box>
        </ContentCard>
        <ContentCard>
        <Stack style={{gap: 12}}>
            <Typography variant="h6" gutterBottom>
              Update Username
            </Typography>
            
            <Stack direction={"row"} gap={4}>
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
            </Stack>

            <Box style={{ marginTop: 4 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </ContentCard>
    </Stack>
  );
}; 