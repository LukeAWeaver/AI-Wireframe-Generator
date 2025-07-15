import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { H3 } from '@ui/components/typography';
import { Stack } from '@ui/primitives';
import { useThemeContext } from '@contexts';

interface ProjectCardArchOverviewProps {
    title: string;
    SvgDiagram: React.ComponentType<any>;
    url?: string;
}

export const ProjectCardArchOverview = ({ title, SvgDiagram, url }: ProjectCardArchOverviewProps) => {
    const { isDarkMode } = useThemeContext();
    return (
        <Stack style={{ flex: 1, display: 'flex', height: "100%", justifyContent: 'space-between' }}>
            <Box style={{ flex: 1, flexGrow: 1, flexShrink: 0, alignItems: "center", flexDirection: "column" }}>
                <H3 style={{ textAlign: 'center' }}>{title}</H3>
                <Box style={{ width: '100%', alignSelf: 'center', borderRadius: 8, color: isDarkMode ? '#fff' : '#222' }}>
                    <SvgDiagram style={{ width: '100%', height: 'auto', display: 'block' }} />
                </Box>
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
};