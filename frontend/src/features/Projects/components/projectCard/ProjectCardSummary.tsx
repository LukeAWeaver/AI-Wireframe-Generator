import { Box } from '@components/Box';
import { TechnologyBadge } from '@components/TechnologyBadge';
import { Stack } from '@primitives/Stack';
import { Text } from '@primitives/Text';

interface ProjectCardSummaryProps {
    purpose: string;
    description: string;
    technologiesUsed: string[];
}

export const ProjectCardSummary = ({ purpose, description, technologiesUsed }: ProjectCardSummaryProps) => (
    <Stack
        style={{
            padding: 4,
            gap: 12,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
        }}
    >
        <Text variant='h3' style={{ textAlign: 'center', paddingTop: 10 }}>{purpose}</Text>
        <Text variant='body2' color='textSecondary' style={{ textAlign: 'center', paddingTop: 10 }}>{description}</Text>
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {technologiesUsed.map(techKey => (
                <TechnologyBadge key={techKey} techName={techKey} />
            ))}
        </Box>
    </Stack>
);
