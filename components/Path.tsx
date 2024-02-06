"use client";
import { PathEdge, PathNode } from "@/types/path";
import {
  attractionForce,
  calculateForce,
  centerForce,
  edgeForce,
  fixCrossEdgeBackTrack,
  repulsionForcePrimary
} from "@/utils/path";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  getNodesBounds,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import OrderedGroup from "./OrderNode";
import SingleGroup from "./SingleNode";
import UnorderedGroup from "./UnorderNode";
import { GroupDisplay } from "@/types/enum";

const nodeTypes = {
  [GroupDisplay.Single]: SingleGroup,
  [GroupDisplay.Ordered]: OrderedGroup,
  [GroupDisplay.Unordered]: UnorderedGroup
};

export default function DirectedGraph({
  flowRef,
  initialNodes,
  initialEdges
}: {
  flowRef: React.MutableRefObject<HTMLDivElement | null>;
  initialNodes: PathNode[];
  initialEdges: PathEdge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesInitialized = useNodesInitialized();
  const reactFlow = useReactFlow();

  useEffect(() => {
    if (nodes[0].height === undefined || nodes[0].width === undefined) return;
    let level = 0;
    const focusNode: PathNode[] = [];
    const focusEdge: PathEdge[] = [];
    while (focusNode.length !== nodes.length) {
      focusNode.push(
        ...(nodes as PathNode[]).filter((node) => node.data.level === level)
      );
      focusEdge.push(
        ...edges.filter((edge) => {
          return (
            focusNode.map((node) => node.id).includes(edge.source) &&
            focusNode.map((node) => node.id).includes(edge.target)
          );
        })
      );

      let isCross = true;
      while (isCross) {
        let minVelocity = 100;
        let minCount = 0;
        while (minCount < 10) {
          const { force, velocity } = calculateForce(
            focusNode as PathNode[],
            focusEdge as PathEdge[],
            [attractionForce, repulsionForcePrimary, centerForce]
          );
          minVelocity <= velocity ? minCount++ : (minCount = 0);
          minVelocity = Math.min(minVelocity, velocity);
          if (minVelocity <= 1) break;
        }

        minVelocity = 100;
        minCount = 0;
        while (minCount < 10) {
          const { force, velocity } = calculateForce(
            focusNode as PathNode[],
            focusEdge as PathEdge[],
            [edgeForce]
          );
          minVelocity <= velocity ? minCount++ : (minCount = 0);
          minVelocity = Math.min(minVelocity, velocity);
          if (minVelocity <= 1) break;
        }

        isCross = false;
        while (
          fixCrossEdgeBackTrack(
            focusNode as PathNode[],
            focusEdge as PathEdge[]
          )
        ) {
          isCross = true;
        }
      }
      level++;
    }
    let minVelocity = 100;
    let minCount = 0;
    while (minCount < 10) {
      const { force, velocity } = calculateForce(
        nodes as PathNode[],
        edges as PathEdge[],
        [attractionForce, repulsionForcePrimary, centerForce]
      );
      minVelocity <= velocity ? minCount++ : (minCount = 0);
      minVelocity = Math.min(minVelocity, velocity);
      if (minVelocity <= 1) break;
    }
    setNodes([...nodes]);

    const bounds = getNodesBounds([...nodes]);
    reactFlow.fitBounds(bounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesInitialized, reactFlow]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        minZoom={0}
        preventScrolling={false}
        panOnDrag={true}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="top-left" />
      </ReactFlow>
    </>
  );
}
