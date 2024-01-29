"use client";
import React, {
  useCallback,
  MouseEvent as ReactMouseEvent,
  useMemo,
  Dispatch,
  SetStateAction
} from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Controls,
  Edge
} from "reactflow";

import "reactflow/dist/style.css";
import CircleNode from "./CircleNode";
import { BriefPathInfo, UndirectedGraphNodeData } from "@/types/type";
import { PathStatus } from "@/types/enum";

interface IOverviewFlowProps {
  setSelectedPath: Dispatch<SetStateAction<BriefPathInfo | null>>;
  initialNodes: Node<UndirectedGraphNodeData>[];
  initialEdges: Edge[];
}

export default function OverviewFlow({
  setSelectedPath,
  initialNodes,
  initialEdges
}: IOverviewFlowProps) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<UndirectedGraphNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ circleNode: CircleNode }), []);
  const reactFlow = useReactFlow();
  const nodeRadius = 24;
  const setCenterView = useCallback(
    (x: number, y: number, id: string) => {
      setNodes(
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                status: PathStatus.CURRENT_PREVIEW
              }
            };
          } else {
            return {
              ...node
            };
          }
        })
      );

      reactFlow.setCenter(x + nodeRadius, y + nodeRadius);
    },
    [reactFlow]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      onNodeClick={(
        event: ReactMouseEvent,
        node: Node<UndirectedGraphNodeData>
      ) => {
        const { x, y } = node.position;
        setCenterView(x, y, node.id);
        setSelectedPath(node.data.pathInfo);
      }}
      onMoveStart={() => {
        setSelectedPath(null);
      }}
    >
      <Background color="#aaa" gap={16} />
      <Controls position="bottom-right" />
    </ReactFlow>
  );
}
