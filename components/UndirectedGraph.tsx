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
  Panel,
  useEdgesState,
  useNodesInitialized,
  useNodesState
} from "reactflow";
import UnselectPath from "./Path";
import PathEdge from "./PathEdge";
import { Button } from "./ui/button";

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

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        panOnDrag={true}
        zoomOnScroll={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeType}
        draggable={true}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        {/* <Panel position="bottom-right">
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [
                attractionForce,
                repulsionForce,
                centerForce
              ]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              initPosition(graphNode);
              setNodes([...graphNode]);
            }}
          >
            Avoid Collision
          </Button>
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [attractionForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
            }}
          >
            Attraction Force
          </Button>
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [repulsionForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
            }}
          >
            Repulsion Force
          </Button>
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [edgeForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
            }}
          >
            Edge Force
          </Button>
        </Panel> */}
      </ReactFlow>
    </>
  );
}
