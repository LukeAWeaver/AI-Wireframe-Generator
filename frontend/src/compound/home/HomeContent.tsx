import { Stack, Typography } from '@mui/material';
export const HomeContent = () => (
  <Stack gap={8}>
  <Typography variant="h4">Welcome to my Portfolio!</Typography>
  <Typography>This portfolio is a full-stack web app hosted on Render for free ( more details in the ${"'" + "Projects" + "'"} section).</Typography>
  <Typography>This portfolio is also hosting a ${"'" + "Wireframe Generator" + "'"} side project that I'm working on so that I can keep my skills up and develop something interesting.</Typography>
  </Stack>
); 