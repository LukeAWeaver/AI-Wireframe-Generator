import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { useThemeContext } from '@contexts';
import { Stack } from '@primitives/Stack';
import { Text } from '@primitives/Text';
import { IProject } from 'features/Projects/data/projects';

export const ProjectCardArchOverview = ({ title, SvgDiagram, url }: Pick<IProject, "SvgDiagram" | "title" | "url">) => {
    const { isDarkMode } = useThemeContext();
    return (
        <Stack style={{ flex: 1, display: 'flex', height: "100%", justifyContent: 'space-between' }}>
            <Box style={{ flex: 1, flexGrow: 1, flexShrink: 0, alignItems: "center", flexDirection: "column" }}>
                <Text variant='h3' style={{ textAlign: 'center' }}>{title}</Text>
                <Box style={{ width: '100%', alignSelf: 'center', borderRadius: 8, color: isDarkMode ? '#fff' : '#222' }}>
                    <SvgDiagram style={{ width: '100%', height: 'auto', display: 'block' }} />
                </Box>
            </Box>
            { url && <Stack style={{ flex: 1, flexGrow: 0, flexShrink: 1 }}>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        href={url}
                        component="a"
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                    >
                        View on Github
                    </Button>
                </Box>
            </Stack>}
        </Stack>
    );
};