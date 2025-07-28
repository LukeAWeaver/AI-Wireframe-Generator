import {
  Box,
  AppBar,
  Card,
  Typography,
  Fab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type NodeType =
  | 'Layout'
  | 'AppBar'
  | 'Sidebar'
  | 'Main'
  | 'Card'
  | 'Table'
  | 'FloatingActionButton'

type WireframeNodeProps = {
  direction?: 'row' | 'column'
  title?: string
  items?: string[]
  columns?: string[]
}

export type WireframeNode = {
  type: NodeType
  props?: WireframeNodeProps
  children?: WireframeNode[]
}

type WireframeRendererProps = {
  node: WireframeNode | null
}

export const WireframeRenderer = ({ node }: WireframeRendererProps) => {
  if (node === null) {
    return null
  }

  const { type, props = {}, children = [] } = node

  switch (type) {
    case 'Layout': {
      const direction = props.direction ?? 'column'
      return (
        <Box display="flex" flexDirection={direction}>
          {children.map((child, i) => (
            <WireframeRenderer key={i} node={child} />
          ))}
        </Box>
      )
    }

    case 'AppBar': {
      return (
        <AppBar position="static">
          <Typography variant="h6" sx={{ m: 2 }}>
            {props.title}
          </Typography>
        </AppBar>
      )
    }

    case 'Sidebar': {
      const items = props.items ?? []
      return (
        <Box width="200px" borderRight={1} borderColor="divider" p={2}>
          {items.map((item, i) => (
            <Typography key={i} variant="body1">
              {item}
            </Typography>
          ))}
        </Box>
      )
    }

    case 'Main': {
      return (
        <Box p={2} flex={1}>
          {children.map((child, i) => (
            <WireframeRenderer key={i} node={child} />
          ))}
        </Box>
      )
    }

    case 'Card': {
      return (
        <Card sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6">{props.title}</Typography>
        </Card>
      )
    }

    case 'Table': {
      const columns = props.columns ?? []
      return (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {props.title}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col}>Sample</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )
    }

    case 'FloatingActionButton': {
      return (
        <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <AddIcon />
        </Fab>
      )
    }

    default:
      return null
  }
}
