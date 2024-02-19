"use client";
import { Group, PathEdge, PathNode } from "@/types/path";
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
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  Node
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
  initialNodes,
  initialEdges,
  initialViewport,
  descriptionHeight
}: {
  initialNodes: PathNode[];
  initialEdges: PathEdge[];
  initialViewport?: { x: number | null; y: number | null; zoom: number | null };
  descriptionHeight: number;
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesInitialized, reactFlow]);

  useEffect(() => {
    if (
      initialViewport &&
      initialViewport.x &&
      initialViewport.y &&
      initialViewport.zoom
    ) {
      const { x, y, zoom } = initialViewport;
      reactFlow.setViewport(
        {
          x,
          y,
          zoom
        },
        { duration: 1000 }
      );
      return;
    }
    if (nodes.length > 0) {
      const node = findRootNode(initialNodes, nodes);

      let nodeWidth = node.width || 0;

      const x = -node.position.x + window.innerWidth / 2 - nodeWidth / 2;
      const y = node.position.y + 40 + descriptionHeight;
      const zoom = 1;

      reactFlow.setViewport({ x, y, zoom }, { duration: 1000 });
    }
  }, [nodes, initialViewport, reactFlow, initialNodes, descriptionHeight]);

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
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </>
  );
}

function findRootNode(
  initialNodes: PathNode[],
  nodes: Node<Group, string | undefined>[]
): Node<Group, string | undefined> {
  let filter = initialNodes.find((node) => node.data.level === 0);
  if (!filter) {
    return nodes[0];
  }
  return nodes.find((node) => node.id === filter?.id) as Node<
    Group,
    string | undefined
  >;
}
