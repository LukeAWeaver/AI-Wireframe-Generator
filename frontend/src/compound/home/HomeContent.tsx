import { CardContent, Stack, Typography } from '@mui/material';
import { ContentCard, H4 } from '@ui/components';
export const HomeContent = () => (
    <ContentCard variant='elevation' style={{minHeight: "100%"}}>
      <CardContent >
        <H4>Welcome to Luke Weaver's Portfolio!</H4>
      </CardContent>
      <CardContent>
        <Typography>This portfolio is a full-stack web app hosted on Render for free ( more details in the Projects section).</Typography>
        <Typography>This web app is also hosting a Wireframe Generator side project that I am working on so that I can keep my skills up while developing something interesting.</Typography>
      </CardContent>
      </ContentCard>
); 