"use client";
import { useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  Edge,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  PanOnScrollMode,
  getNodesBounds,
  useReactFlow,
  useViewport
} from "reactflow";
import GroupNode from "./customNode/GroupNode";
import SingleNode from "./customNode/SingleNode";
import "reactflow/dist/style.css";

interface pathProps {
  screenWidth: number;
  screenHeight: number;
  initialNodes: Node[];
  initialEdges: Edge[];
}

export default function DirectedGraph({
  screenWidth,
  screenHeight,
  initialNodes,
  initialEdges
}: pathProps) {
  const { setViewport } = useReactFlow();
  const nodeTypes = useMemo(
    () => ({
      groupNode: GroupNode,
      singleNode: SingleNode
    }),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const bounds = getNodesBounds(nodes);

  if (bounds.height < screenHeight) {
    bounds.height = screenHeight;
  }

  const { x, y, zoom } = useViewport();
  console.log("Viewport: ", x, y, zoom);

  // useEffect(() => {
  //   setViewport({
  //     x: -rootInfo.x + screenWidth / 2 - rootInfo.width / 2,
  //     y: 0,
  //     zoom: zoom
  //   });
  // }, [screenWidth]);

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
        panOnDrag={false}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Free}
        fitView
        // fitViewOptions={{
        //   includeHiddenNodes: true,
        //   nodes: nodes
        // }}
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
        // onInit={() => {
        //   setViewport({
        //     x: -rootInfo.x,
        //     y: rootInfo.y,
        //     zoom: 0.5
        //   });
        // }}
      >
        {/* <Controls />
        <MiniMap pannable zoomable /> */}
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
