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
  Controls
} from "reactflow";

import { nodes as initialNodes, edges as initialEdges } from "./nodes-edges";
import "reactflow/dist/style.css";
import CircleNode from "./CircleNode";
import { BriefPathInfo, NodeData } from "@/types/type";
import { NodeStatusEnum } from "@/types/enum";

interface IOverviewFlowProps {
  setSelectedPath: Dispatch<SetStateAction<BriefPathInfo | null>>;
}

export default function OverviewFlow({ setSelectedPath }: IOverviewFlowProps) {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NodeData>(initialNodes);
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
                status: NodeStatusEnum.CURRENT_PREVIEW
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
      onNodeClick={(event: ReactMouseEvent, node: Node<NodeData>) => {
        const { x, y } = node.position;
        setCenterView(x, y, node.id);
        setSelectedPath(node.data.pathInfo);
      }}
    >
      <Background color="#aaa" gap={16} />
      <Controls position="bottom-right" />
    </ReactFlow>
  );
}
