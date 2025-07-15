import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { TechnologyBadge } from '@compound/projects/TechnologyBadge';
import { IWorkCard } from '../../app/workHistoryData';
import { FlippableCard } from '@components/FlippableCard';

export interface WorkHistoryCardProps {
  item: IWorkCard;
  mustBeSelectedToFlip?: boolean;
}

export const WorkHistoryCard: React.FC<WorkHistoryCardProps> = ({ item, mustBeSelectedToFlip }) => {
  // Front: Concise Overview
  const frontContent = (
    <Stack spacing={2} style={{ flex: 1, height: '100%', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {item.company} — {item.role}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Duration: {item.duration}
        </Typography>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Key Areas:
        </Typography>
        <Stack spacing={0.5} mb={1}>
          {item.keyAreas.map((area, i) => (
            <Typography key={i} variant="body2">• {area}</Typography>
          ))}
        </Stack>
        {item.featuresOwned.length > 0 && <>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Core Features Owned:
          </Typography>
          <Stack spacing={0.5} mb={1}>
            {item.featuresOwned.map((feature, i) => (
              <Typography key={i} variant="body2">• {feature}</Typography>
            ))}
          </Stack>
        </>}
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Tech:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          {item.tech.map((tech) => (
            <TechnologyBadge key={tech} techName={tech} />
          ))}
        </Box>
    </Stack>
  );

  // Back: Details & Impact
  const backContent = (
    <Stack spacing={2} style={{ flex: 1, height: '100%' }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {item.company} — {item.role}
      </Typography>
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>Details & Impact</Typography>
      <Stack spacing={1} mb={item.featureDetails && item.featureDetails.length > 0 ? 2 : 0}>
        {item.impact.map((line, i) => (
          <Typography key={i} variant="body2">• {line}</Typography>
        ))}
      </Stack>
      {item.featureDetails && item.featureDetails.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>Feature Details</Typography>
          <Stack spacing={1}>
            {item.featureDetails.map((hl, i) => (
              <Typography key={i} variant="body2">• {hl}</Typography>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );

  return (
      <FlippableCard
        frontContent={frontContent}
        backContent={backContent}
        mustBeSelectedToFlip={mustBeSelectedToFlip}
      />
  );
}; 