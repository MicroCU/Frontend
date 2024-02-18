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
import ReactFlow, {
  Background,
  BackgroundVariant,
  Panel,
  useEdgesState,
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

  const graphNode = nodes as GraphNode[];
  const graphEdge = edges as GraphEdge[];

  const applyForce = () => {
    calculateForce(graphNode, graphEdge, [
      attractionForce
      //   repulsionForce,
      //   centerForce
    ]);
    setNodes([...graphNode]);
    setEdges([...graphEdge]);
    console.log(graphNode, graphEdge);
  };

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
        <Panel position="bottom-right">
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [attractionForce, repulsionForce, centerForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
              console.log(graphNode, graphEdge);
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
              console.log(graphNode, graphEdge);
            }}
          >
            Attraction Force
          </Button>
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [repulsionForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
              console.log(graphNode, graphEdge);
            }}
          >
            Repulsion Force
          </Button>
          <Button
            onClick={() => {
              calculateForce(graphNode, graphEdge, [edgeForce]);
              setNodes([...graphNode]);
              setEdges([...graphEdge]);
              console.log(graphNode, graphEdge);
            }}
          >
            Edge Force
          </Button>
        </Panel>
      </ReactFlow>
    </>
  );
}
