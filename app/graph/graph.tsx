"use client";
import React, {
  useCallback,
  MouseEvent as ReactMouseEvent,
  useMemo
} from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node
} from "reactflow";

import { nodes as initialNodes, edges as initialEdges } from "./nodes-edges";
import "reactflow/dist/style.css";
import CircleNode from "./CircleNode";
import { NodeData } from "@/types/type";
import { NodeStatusEnum } from "@/types/enum";

const OverviewFlow = () => {
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
      onNodeClick={(event: ReactMouseEvent, node: Node) => {
        const { x, y } = node.position;
        setCenterView(x, y, node.id);
      }}
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
