import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Grid, Divider, useTheme } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { useUser } from '@hooks/useUser';
import { useRightSidebar } from '@contexts';
import { WireframeSectionHeading, ContentCard, H4 } from '@ui/components';
import { Tooltip } from '@components/Tooltip';
import { Stack } from '@ui/primitives';

export const WireframeGeneratorPanel = () => {
  const { username, uuid, build_count, incrementUserBuildCount } = useUser();
  const [input, setInput] = useState('');
  const [wireframe, setWireframe] = useState<string | null>(null);
  const { setSidebarContent } = useRightSidebar();
  const theme = useTheme();

  // Build Sidebar Content
  const buildSidebar = (
    <Box sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
      <WireframeSectionHeading variant="h6">Build History</WireframeSectionHeading>
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
  );

  useEffect(() => {
    setSidebarContent(buildSidebar);
    return () => setSidebarContent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuild = async () => {
    if (username) {
      try {
        await incrementUserBuildCount(username);
        setWireframe('Rendered wireframe will appear here.');
      } catch (error) {
        console.error('Failed to increment build count:', error);
        // Still show the wireframe even if build count increment fails
        setWireframe('Rendered wireframe will appear here.');
      }
    } else {
      setWireframe('Rendered wireframe will appear here.');
    }
  };

  const handleBuildClick = () => {
    handleBuild().catch(() => {});
  };

  return (
    <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* User Info */}
      <ContentCard>
        <Stack gap={2}>
          <H4>User Profile</H4>
          <Stack gap={1}>
          <Typography variant="subtitle1">User: <b>{username}</b></Typography>
          <Typography variant="subtitle1">build count: <b>{build_count}</b></Typography>
          <Typography variant="body2" color="text.secondary">User ID: {uuid}</Typography>
          </Stack>
        </Stack>
      </ContentCard>
      {/* Build Form */}
      <ContentCard sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Describe your wireframe"
          value={input}
          onChange={e => setInput(e.target.value)}
          fullWidth
          variant="outlined"
          InputProps={{
            sx: { fontSize: 24, py: 2, border: 'none' }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              fontSize: 24,
              py: 2,
              '& fieldset': {
                borderWidth: 2,
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleBuildClick}
          sx={{ minWidth: 120 }}
        >
          Build
        </Button>
      </ContentCard>
      {/* Rendered Wireframe */}
      <ContentCard flex minHeight={240}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography color="text.secondary" align="center">
            {wireframe || 'Wireframe preview will be rendered here.'}
          </Typography>
          <Tooltip content="An LLM running via Ollama will convert text prompts into wireframes, code, and visuals, which will appear here">
            <HelpOutline sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      </ContentCard>
    </Box>
  );
}; 