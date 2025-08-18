import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material'
import { HelpOutline } from '@mui/icons-material'
import { useUser } from '@hooks/useUser'
import { useRightSidebar } from '@contexts'
import { Text } from '@primitives/Text'
import { ContentCard } from '@components/ContentCard'
import { Stack } from '@primitives/Stack'
import { Tooltip } from '@components/Tooltip'
import { WireframeRenderer } from './WireframeRenderer'
import { TextInput } from '@primitives/TextInput'

export const WireframePanel = () => {
  const { username, uuid, build_count, generateUserWireframe } = useUser()
  const [input, setInput] = useState('')
  const [wireframe, setWireframe] = useState<ReactNode | null>(null)
  const { setSidebarContent } = useRightSidebar()

  const buildSidebar = useMemo(() => (
    <Box sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
      <Text variant="h6">Build History</Text>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Text variant="subtitle2">Component 1</Text>
              <Text variant="body2" color="text.secondary">Card content here</Text>
            </CardContent>
          </Card>
        </Grid>
        {[2, 3, 4].map((slot) => (
          <Grid item xs={12} key={slot}>
            <Card variant="outlined" sx={{ borderStyle: 'dashed', opacity: 0.5 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" align="center">
                  Empty Slot
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  ), [])

  useEffect(() => {
    setSidebarContent(buildSidebar)
    return () => setSidebarContent(null)
  }, [setSidebarContent, buildSidebar])

  const handleBuild = useCallback(async () => {
    try {
      const result = await generateUserWireframe(input)
      console.log(result)
      setWireframe(<WireframeRenderer node={result} />)
    } catch (error) {
      console.error('Failed to generate wireframe:', error)
      setWireframe(<Typography color="error">Error rendering wireframe.</Typography>)
    }
  }, [input, generateUserWireframe])

  return (
    <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ContentCard>
        <Stack gap={2}>
          <Text variant="h4">User Profile</Text>
          <Stack gap={1}>
            <Typography variant="subtitle1">User: <b>{username}</b></Typography>
            <Typography variant="subtitle1">Build count: <b>{build_count}</b></Typography>
            <Typography variant="body2" color="text.secondary">User ID: {uuid}</Typography>
          </Stack>
        </Stack>
      </ContentCard>

      <ContentCard sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Describe your wireframe"
          fullWidth
        />
        <Button variant="contained" onClick={handleBuild} sx={{ minWidth: 120 }}>
          Build
        </Button>
      </ContentCard>

    <ContentCard flex minHeight={240}>
      {wireframe ? (
        wireframe
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography color="text.secondary" align="center">
            Wireframe preview will be rendered here.
          </Typography>
          <Tooltip content="An LLM running via Ollama will convert text prompts into wireframes, code, and visuals, which will appear here">
            <HelpOutline sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      )}
    </ContentCard>

    </Box>
  )
}
