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
import { IGroupData } from "@/types/type";
import UnorderedGroup from "./customNode/Unordered";

interface pathProps {
  initialNodes: Node<IGroupData, GroupTypeEnum>[];
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
    useNodesState<IGroupData>(initialNodes);
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
        <Controls />
        {/* <MiniMap pannable zoomable /> */}
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
