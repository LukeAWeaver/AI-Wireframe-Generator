import { Box } from '@mui/material'
import { WireframeNode } from './../../types'
import { WireframeRenderer } from '../WireframeRenderer'

export const RenderMain = (node: WireframeNode) => {
  const { style } = node.props || {}

  return (
    <Box p={2} flex={1} sx={style}>
      {node.children?.map((child, i) => (
        <WireframeRenderer key={i} node={child} />
      ))}
    </Box>
  )
} 