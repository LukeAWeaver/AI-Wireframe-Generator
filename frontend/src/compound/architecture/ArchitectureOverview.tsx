import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArchitectureHeading, ArchitectureDescription, ArchitecturePurpose } from '@ui/components/typography';
import { useTheme } from '@mui/material';

// SVG component from architecture.tsx
const ArchitectureSVG = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg width="1100" height="500" viewBox="0 0 1100 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ background: theme.palette.background.default }} {...props}>
      {/* ... SVG content ... */}
    </svg>
  );
};

export const ArchitectureOverview = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ArchitectureHeading variant="h2">
        System Architecture Overview
      </ArchitectureHeading>
      <ArchitectureDescription>
        This system follows a modern, modular web architecture. The <b>User (Browser)</b> interacts with the <b>Frontend</b> (built with React and MUI), which serves static assets and provides a responsive UI. The frontend communicates with the <b>API Layer</b> (REST/GraphQL) for all dynamic data needs. Authentication is handled via a dedicated <b>Auth Service</b>, ensuring secure login and token management. The <b>Backend (Django)</b> implements business logic, orchestrates data flow, and exposes APIs. Persistent data is stored in a <b>PostgreSQL</b> database, accessed only by the backend. All flows are secured, and the architecture supports scalability, separation of concerns, and maintainability for enterprise-grade applications.
      </ArchitectureDescription>
      <Box sx={{ maxWidth: 900, width: '100%', mt: 3 }}>
        <ArchitectureSVG style={{ width: '100%', height: 'auto' }} />
      </Box>
      <ArchitecturePurpose>
        <b>Wireframe Generation Purpose:</b> This platform enables users to describe UI layouts in natural language, which are then sent to the backend and integrated with the OpenAI API (ChatGPT). The backend processes the prompt, requests a wireframe from ChatGPT, and returns a rendered wireframe preview to the frontend. This workflow accelerates prototyping, bridges the gap between design and engineering, and leverages AI to turn ideas into interactive wireframes in real time.
      </ArchitecturePurpose>
    </Box>
  );
}; 