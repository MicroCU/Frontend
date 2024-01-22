"use client";
import { useMemo, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  getNodesBounds,
  Viewport,
  useOnViewportChange,
  Controls
} from "reactflow";
import OrderedGroup from "./customNode/Ordered";
import SingleNode from "./customNode/SingleNode";
import "reactflow/dist/style.css";
import { GroupTypeEnum } from "@/types/enum";
import { GroupData } from "@/types/type";
import UnorderedGroup from "./customNode/Unordered";

interface pathProps {
  initialNodes: Node<GroupData, GroupTypeEnum>[];
  initialEdges: Edge<any>[];
}

export default function DirectedGraph({
  initialNodes,
  initialEdges
}: pathProps) {
  const nodeTypes = useMemo(
    () => ({
      Ordered: OrderedGroup,
      Unordered: UnorderedGroup,
      Single: SingleNode
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] =
    useNodesState<GroupData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const bounds = getNodesBounds(nodes);
  const [minZoomLevel, setMinZoomLevel] = useState<number>(0);
  useOnViewportChange({
    onChange: (viewport: Viewport) =>
      minZoomLevel === 0 && setMinZoomLevel(viewport.zoom)
  });

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        fitView
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
        minZoom={minZoomLevel}
        preventScrolling={false}
        panOnDrag={true}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
