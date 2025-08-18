import { Card, Typography } from '@mui/material'
import { WireframeNode } from './../../types'
import { WireframeRenderer } from '../WireframeRenderer'

export const RenderCard = (node: WireframeNode) => {
  const { title, style } = node.props || {}

  return (
    <Card sx={{ p: 2, mb: 2, ...style }}>
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      {node.children?.map((child, i) => (
        <WireframeRenderer key={i} node={child} />
      ))}
    </Card>
  )
} 