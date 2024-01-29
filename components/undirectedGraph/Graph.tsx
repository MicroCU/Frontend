"use client";
import React, {
  useCallback,
  MouseEvent as ReactMouseEvent,
  useMemo,
  useEffect
} from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Node,
  Controls,
  Edge,
  BackgroundVariant
} from "reactflow";

import "reactflow/dist/style.css";
import CircleNode from "./CircleNode";
import { UndirectedGraphNodeData } from "@/types/type";
import { PathStatus, UndirectedNodeType } from "@/types/enum";
import { useSelectedPath } from "@/context/SelectedPath";

interface IOverviewFlowProps {
  initialNodes: Node<UndirectedGraphNodeData, UndirectedNodeType>[];
  initialEdges: Edge[];
}

export default function OverviewFlow({
  initialNodes,
  initialEdges
}: IOverviewFlowProps) {
  const { selectedPath, setSelectedPath } = useSelectedPath();
  const [nodes, setNodes, onNodesChange] =
    useNodesState<UndirectedGraphNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(
    () => ({
      circularNode: CircleNode
    }),
    []
  );
  const currentNodeRadius = 24;
  const reactFlow = useReactFlow();
  const setCenterView = useCallback(
    (selectedNode: Node<UndirectedGraphNodeData>) => {
      setNodes(
        initialNodes.map((node) => {
          if (node.id === selectedNode.id) {
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

      reactFlow.setCenter(
        selectedNode.position.x + currentNodeRadius,
        selectedNode.position.y + currentNodeRadius
      );
    },
    [reactFlow]
  );

  useEffect(() => {
    let selectedNode =
      nodes.find((node) => node.data.pathInfo.id === selectedPath?.id) ?? null;
    if (selectedPath && selectedNode) {
      setCenterView(selectedNode);
    }
    if (selectedPath === null) {
      setNodes(initialNodes);
    }
  }, [selectedPath]);

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
        setSelectedPath(node.data.pathInfo);
      }}
    >
      <Background variant={BackgroundVariant.Dots} color="#aaa" gap={16} />
      <Controls position="bottom-right" />
    </ReactFlow>
  );
}
