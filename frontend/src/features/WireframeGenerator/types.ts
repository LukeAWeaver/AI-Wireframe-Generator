export type NodeType =
  | 'Layout'
  | 'AppBar'
  | 'Sidebar'
  | 'Main'
  | 'Card'
  | 'Table'
  | 'FloatingActionButton'
  | 'Text'
  | 'Image'
  | 'Graph'
  | 'Form'
  | 'Button'
  | 'Tabs';

export interface WireframeNode {
  type: NodeType;
  props?: {
    style?: React.CSSProperties;
    [key: string]: any;
  };
  children?: WireframeNode[];
}