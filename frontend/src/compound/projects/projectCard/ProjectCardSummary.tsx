import { Box } from '@components/Box';
import { ProjectDescription, H3 } from '@ui/components';
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
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
        }}
    >
        <H3 style={{ textAlign: 'center', paddingTop: 10 }}>{purpose}</H3>
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
