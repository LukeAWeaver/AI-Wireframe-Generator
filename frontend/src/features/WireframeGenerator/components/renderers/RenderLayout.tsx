import { WireframeNode } from './../../types'
import { Box } from '@mui/material'
import { WireframeRenderer } from '../WireframeRenderer'

export const RenderLayout = (node: WireframeNode) => {
  const direction = node.props?.direction || 'column'
  const style = node.props?.style || {}

  return (
    <Box display="flex" flexDirection={direction} sx={style}>
      {node.children?.map((child, index) => (
        <WireframeRenderer key={index} node={child} />
      ))}
    </Box>
  )
} 