import { Box, TextField, Button, Stack } from '@mui/material'
import { WireframeNode } from './../../types'

export const RenderForm = (node: WireframeNode) => {
  const { fields = [], style } = node.props || {}

  return (
    <Box component="form" sx={style}>
      <Stack spacing={2}>
        {fields.map((field: { label: string; type: string }, i: number) => (
          <TextField key={i} label={field.label} type={field.type} fullWidth />
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </Box>
  )
} 