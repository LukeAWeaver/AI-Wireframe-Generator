import { AppBar, Toolbar, Typography } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderAppBar = (node: WireframeNode) => {
  const { title, style } = node.props || {}

  return (
    <AppBar position="static" sx={style}>
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  )
} 