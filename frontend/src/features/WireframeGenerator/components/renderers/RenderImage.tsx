import { Box } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderImage = (node: WireframeNode) => {
  const { src = '', alt = '', style } = node.props || {}

  return <Box component="img" src={src} alt={alt} sx={{ width: '100%', ...style }} />
} 