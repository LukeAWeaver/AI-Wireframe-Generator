import { Tabs, Tab, Box } from '@mui/material'
import { useState } from 'react'
import { WireframeNode } from './../../types'
import { WireframeRenderer } from '../WireframeRenderer'

export const RenderTabs = (node: WireframeNode) => {
  const { tabs = [], style } = node.props || {}
  const [value, setValue] = useState(0)

  return (
    <Box sx={style}>
      <Tabs value={value} onChange={(_, newVal) => setValue(newVal)}>
        {tabs.map((tab: { label: string }, i: number) => (
          <Tab key={i} label={tab.label} />
        ))}
      </Tabs>
      {node.children && node.children[value] && (
        <Box sx={{ p: 2 }}>
          <WireframeRenderer node={node.children[value]} />
        </Box>
      )}
    </Box>
  )
} 