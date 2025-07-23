import { Box, AppBar, Card, Typography, Fab, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const WireframeRenderer = ({ node }: { node: any }) => {
  if (!node) return null;

  const { type, props = {}, children = [] } = node;

  switch (type) {
    case 'Layout':
      return (
        <Box display="flex" flexDirection={props.direction || 'column'}>
          {children.map((child: any, i: number) => (
            <WireframeRenderer key={i} node={child} />
          ))}
        </Box>
      );

    case 'AppBar':
      return (
        <AppBar position="static">
          <Typography variant="h6" sx={{ m: 2 }}>{props.title}</Typography>
        </AppBar>
      );

    case 'Sidebar':
      return (
        <Box width="200px" borderRight={1} borderColor="divider" p={2}>
          {props.items.map((item: string, i: number) => (
            <Typography key={i} variant="body1">{item}</Typography>
          ))}
        </Box>
      );

    case 'Main':
      return (
        <Box p={2} flex={1}>
          {children.map((child: any, i: number) => (
            <WireframeRenderer key={i} node={child} />
          ))}
        </Box>
      );

    case 'Card':
      return (
        <Card sx={{ mb: 2, p: 2 }}>
          <Typography variant="h6">{props.title}</Typography>
        </Card>
      );

    case 'Table':
      return (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>{props.title}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {props.columns.map((col: string) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {props.columns.map((col: string) => (
                  <TableCell key={col}>Sample</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      );

    case 'FloatingActionButton':
      return (
        <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <AddIcon />
        </Fab>
      );

    default:
      return null;
  }
};
