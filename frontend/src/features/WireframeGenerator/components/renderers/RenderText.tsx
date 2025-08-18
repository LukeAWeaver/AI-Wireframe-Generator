import { Typography } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderText = (node: WireframeNode) => {
  const { text = '', variant = 'body1', style } = node.props || {}

  return <Typography variant={variant} sx={style}>{text}</Typography>
} 