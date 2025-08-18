import { Box, Typography } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderGraph = (node: WireframeNode) => {
  const { title, style } = node.props || {}

  return (
    <Box sx={{ border: '1px dashed gray', p: 2, textAlign: 'center', ...style }}>
      <Typography variant="subtitle1">{title || 'Graph Placeholder'}</Typography>
      <Box sx={{ height: 120, backgroundColor: '#eee', mt: 1 }} />
    </Box>
  )
} 