import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Card, CardContent, Grid, Divider } from '@mui/material';
import { useUser } from '../hooks/useUser';

export const WireframeGenerator = () => {
  const { username, uuid } = useUser();
  const [input, setInput] = useState('');
  const [wireframe, setWireframe] = useState<string | null>(null);

  // Placeholder for OpenAI wireframe rendering
  const handleBuild = () => {
    setWireframe('Rendered wireframe will appear here.');
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* User Info */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">User: <b>{username}</b></Typography>
          <Typography variant="body2" color="text.secondary">User ID: {uuid}</Typography>
        </Paper>
        {/* Build Form */}
        <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Describe your wireframe"
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
            size="small"
          />
          <Button variant="contained" onClick={handleBuild} sx={{ minWidth: 120 }}>
            Build
          </Button>
        </Paper>
        {/* Rendered Wireframe */}
        <Paper sx={{ p: 3, flex: 1, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="text.secondary" align="center">
            {wireframe || 'Wireframe preview will be rendered here.'}
          </Typography>
        </Paper>
      </Box>
      {/* Right Sidebar */}
      <Box sx={{ width: { xs: 200, md: 320 }, bgcolor: 'background.paper', borderLeft: 1, borderColor: 'divider', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Build</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {/* Example filled card slot */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2">Component 1</Typography>
                <Typography variant="body2" color="text.secondary">Card content here</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Placeholder slots */}
          {[2, 3, 4].map(slot => (
            <Grid item xs={12} key={slot}>
              <Card variant="outlined" sx={{ borderStyle: 'dashed', opacity: 0.5 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Empty Slot
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}; 