import { PathDisplay } from "@/types/enum";
import { GraphEdge, GraphNode } from "@/types/graph";
import {
  attractionForce,
  calculateForce,
  centerForce,
  edgeForce,
  initPosition,
  repulsionForce
} from "@/utils/graph";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  getNodesBounds,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow
} from "reactflow";
import UnselectPath from "./Path";
import PathEdge from "./PathEdge";

const nodeTypes = {
  [PathDisplay.Unselect]: UnselectPath
};

const edgeType = {
  default: PathEdge
};

export default function UndirectedGraph({
  initialNodes,
  initialEdges
}: {
  initialNodes: GraphNode[];
  initialEdges: GraphEdge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesInitialized = useNodesInitialized();

  const graphNode = nodes as GraphNode[];
  const graphEdge = edges as GraphEdge[];

  useEffect(() => {
    if (
      nodes.length == 0 ||
      nodes[0].height === undefined ||
      nodes[0].width === undefined
    )
      return;
    initPosition(graphNode);

    for (let i = 0; i < 100; i++) {
      calculateForce(graphNode, graphEdge, [
        attractionForce,
        repulsionForce,
        centerForce
      ]);
    }

    for (let i = 0; i < 3; i++) {
      calculateForce(graphNode, graphEdge, [edgeForce]);
    }

    setNodes([...graphNode]);
    setEdges([...graphEdge]);
  }, [nodesInitialized]);

  const reactFlow = useReactFlow();
  useEffect(() => {
    const bounds = getNodesBounds(nodes);
    reactFlow.fitBounds(bounds, { duration: 1000 });
  }, [nodes, reactFlow]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        panOnDrag={true}
        zoomOnScroll={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeType}
        draggable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        minZoom={0}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="top-left" />
      </ReactFlow>
    </>
  );
}
