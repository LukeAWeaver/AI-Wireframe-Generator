import { Button } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderButton = (node: WireframeNode) => {
  const { label = 'Button', variant = 'contained', style } = node.props || {}

  return <Button variant={variant} sx={style}>{label}</Button>
} 
