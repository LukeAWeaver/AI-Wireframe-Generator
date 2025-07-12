import { useState } from 'react';
import { Box } from '@mui/material';

export const WireframeGeneratorPanel = () => {
  const [input, setInput] = useState('');
  const [wireframe, setWireframe] = useState<string | null>(null);

  return (
    <Box>
      {/* Render the main wireframe generator UI here */}
    </Box>
  );
} 