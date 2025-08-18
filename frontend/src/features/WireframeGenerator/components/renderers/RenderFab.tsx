import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { WireframeNode } from './../../types'

export const RenderFab = (node: WireframeNode) => {
  const { style } = node.props || {}

  return (
    <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16, ...style }}>
      <AddIcon />
    </Fab>
  )
} 