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
  PanOnScrollMode,
  getNodesBounds,
  Viewport,
  useOnViewportChange,
  Controls
} from "reactflow";
import GroupNode from "./customNode/GroupNode";
import SingleNode from "./customNode/SingleNode";
import TendonGroupNode from "./tendonCustomNode/GroupNode";
import TendonSingleNode from "./tendonCustomNode/SingleNode";
import "reactflow/dist/style.css";

interface pathProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export default function DirectedGraph({
  initialNodes,
  initialEdges
}: pathProps) {
  const nodeTypes = useMemo(
    () => ({
      groupNode: GroupNode,
      singleNode: SingleNode
      // groupNode: TendonGroupNode,  // Uncomment this line to use Tendon Node
      // singleNode: TendonSingleNode  // Uncomment this line to use Tendon Node
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        panOnDrag={true}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Free}
        preventScrolling={false}
        fitView
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
        minZoom={minZoomLevel}
      >
        <Controls />
        {/* <MiniMap pannable zoomable /> */}
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
