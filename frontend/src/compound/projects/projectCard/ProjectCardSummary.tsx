import { Box } from '@components/Box';
import { ProjectDescription, H5 } from '@ui/components';
import { TechnologyBadge } from '@compound/projects/TechnologyBadge';
import { Stack } from '@ui/primitives';

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
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}
    >
        <H5 style={{ textAlign: 'center' }}>{purpose}</H5>
        <ProjectDescription>
            {description}
        </ProjectDescription>
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {technologiesUsed.map(techKey => (
                <TechnologyBadge key={techKey} techName={techKey} />
            ))}
        </Box>
    </Stack>
);
