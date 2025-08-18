import { Box } from "@mui/material";
import { WireframeNode } from "../types";
import { RenderAppBar } from "./renderers/RenderAppBar";
import { RenderButton } from "./renderers/RenderButton";
import { RenderCard } from "./renderers/RenderCard";
import { RenderFab } from "./renderers/RenderFab";
import { RenderForm } from "./renderers/RenderForm";
import { RenderGraph } from "./renderers/RenderGraph";
import { RenderImage } from "./renderers/RenderImage";
import { RenderLayout } from "./renderers/RenderLayout";
import { RenderMain } from "./renderers/RenderMain";
import { RenderSidebar } from "./renderers/RenderSidebar";
import { RenderTable } from "./renderers/RenderTable";
import { RenderTabs } from "./renderers/RenderTabs";
import { RenderText } from "./renderers/RenderText";

export const WireframeRenderer = ({ node }: { node: WireframeNode }) => {
  if (!node) return null;

  const { type } = node;

  switch (type) {
    case 'Layout': return <RenderLayout {...node} />;
    case 'AppBar': return <RenderAppBar {...node} />;
    case 'Sidebar': return <RenderSidebar {...node} />;
    case 'Main': return <RenderMain {...node} />;
    case 'Card': return <RenderCard {...node} />;
    case 'Table': return <RenderTable {...node} />;
    case 'FloatingActionButton': return <RenderFab {...node} />;
    case 'Text': return <RenderText {...node} />;
    case 'Image': return <RenderImage {...node} />;
    case 'Graph': return <RenderGraph {...node} />;
    case 'Form': return <RenderForm {...node} />;
    case 'Button': return <RenderButton {...node} />;
    case 'Tabs': return <RenderTabs {...node} />;
    default:
      return <Box>Unsupported node type: {type}</Box>;
  }
};
