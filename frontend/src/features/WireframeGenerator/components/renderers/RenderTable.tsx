import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { WireframeNode } from '../../types';
import { WireframeRenderer } from '../WireframeRenderer';

export const RenderTable = ({ props, children = [] }: WireframeNode) => {
  if (!Array.isArray(children)) return null;

  const [headerRow, ...bodyRows] = children;

  return (
    <TableContainer component={Paper} sx={props?.style}>
      <Table>
        <TableHead>
          <TableRow>
            {headerRow?.children?.map((cell, i) => (
              <TableCell key={i}>
                <WireframeRenderer node={cell} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((row, i) => (
            <TableRow key={i}>
              {row.children?.map((cell, j) => (
                <TableCell key={j}>
                  <WireframeRenderer node={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
