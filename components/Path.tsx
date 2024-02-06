"use client";
import { PathEdge, PathNode } from "@/types/path";
import {
  ForceFunction,
  attractionForce,
  calculateForce,
  centerForce,
  edgeForce,
  fixCrossEdgeBackTrack,
  repulsionForcePrimary
} from "@/utils/path";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  useEdgesState,
  useNodesInitialized,
  useNodesState
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
  const [level, setLevel] = useState(0);
  const nodesInitialized = useNodesInitialized();

  const applyForce = (...f: ForceFunction[]) => {
    calculateForce(nodes as PathNode[], edges as PathEdge[], f);
    setNodes([...nodes]);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesInitialized]);

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
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
