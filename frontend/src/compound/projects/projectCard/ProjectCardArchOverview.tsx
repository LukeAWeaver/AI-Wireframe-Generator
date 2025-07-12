import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { H3 } from '@ui/components/typography';
import { Stack } from '@ui/primitives';

interface ProjectCardArchOverviewProps {
    title: string;
    imageUrl: string;
    url?: string;
}

export const ProjectCardArchOverview = ({ title, imageUrl, url }: ProjectCardArchOverviewProps) => (
    <Stack style={{ flex: 1, display: 'flex', height: "100%", justifyContent: 'space-between' }}>
        <Box style={{ flex: 1, flexGrow: 1, flexShrink: 0 }}>
            <H3 style={{ textAlign: 'center' }}>{title}</H3>
            <img
                src={imageUrl}
                alt={title}
                style={{
                    width: '100%',
                    objectFit: 'contain',
                    borderRadius: 8,
                }}
            />
        </Box>
        <Stack style={{ flex: 1, flexGrow: 0, flexShrink: 1 }}>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    href={url}
                    component="a"
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (url) {
                            window.open(url, '_blank', 'noopener,noreferrer');
                        }
                    }}
                >
                    View on Github
                </Button>
            </Box>
        </Stack>
    </Stack>
);