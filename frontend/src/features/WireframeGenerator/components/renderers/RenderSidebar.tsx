import { Box, Typography } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderSidebar = (node: WireframeNode) => {
  const { items = [], style } = node.props || {}

  return (
    <Box width={240} p={2} borderRight={1} borderColor="divider" sx={style}>
      {items.map((item: string, i: number) => (
        <Typography key={i} variant="body1">{item}</Typography>
      ))}
    </Box>
  )
} 