import { GraphEdge, GraphNode, Path } from "@/types/graph";
import {
  attractionForce,
  calculateForce,
  centerForce,
  edgeForce,
  initPosition,
  repulsionForce
} from "@/utils/graph";
import {
  useCallback,
  useEffect,
  useState,
  MouseEvent as ReactMouseEvent
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  getNodesBounds,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  Node
} from "reactflow";
import PathEdge from "../PathEdge";
import { GraphDisplay, PathStatus } from "@/types/enum";
import CircleNode from "./CircleNode";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { UndirectedGraphNodeData } from "@/types/type";

const nodeTypes = {
  [GraphDisplay.CircleNode]: CircleNode
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
  const reactFlow = useReactFlow();

  const graphNode = nodes as GraphNode[];
  const graphEdge = edges as GraphEdge[];

  const { selectedPath, setSelectedPath } = useJourneyGraph();

  // Apply force to nodes
  useEffect(() => {
    if (
      nodes.length == 0 ||
      nodes[0].height === undefined ||
      nodes[0].width === undefined
    ) {
      return;
    }
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

    const bounds = getNodesBounds(graphNode);
    reactFlow.fitBounds(bounds, { duration: 1000 });
  }, [nodesInitialized]);

  // Center view to selected node
  const currentNodeRadius = 24;
  const [prevCurrent, setPrevCurrent] = useState<{
    id: string;
    status: PathStatus;
  } | null>(null);

  const setCenterView = useCallback(
    (selectedNode: Node<Path>) => {
      setNodes(
        nodes.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                status: PathStatus.CURRENT_PREVIEW
              }
            };
          } else if (node.id === prevCurrent?.id) {
            return {
              ...node,
              data: {
                ...node.data,
                status: prevCurrent.status
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
        selectedNode.position.y + currentNodeRadius,
        { duration: 1000 }
      );

      setPrevCurrent({
        id: selectedNode.id,
        status: selectedNode.data.status
      });
    },
    [reactFlow, nodes]
  );

  useEffect(() => {
    let selectedNode =
      nodes.find((node) => node.data.pathInfo.id === selectedPath?.id) ?? null;
    if (selectedPath && selectedNode) {
      setCenterView(selectedNode);
    }
    if (selectedPath === null) {
      // When click close the path description modal
      setNodes(
        nodes.map((node) => {
          if (node.id === prevCurrent?.id) {
            return {
              ...node,
              data: {
                ...node.data,
                status: prevCurrent.status
              }
            };
          } else {
            return {
              ...node
            };
          }
        })
      );
    }
  }, [selectedPath]);

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
        onNodeClick={(
          event: ReactMouseEvent,
          node: Node<UndirectedGraphNodeData>
        ) => {
          setSelectedPath(node.data.pathInfo);
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls position="bottom-right" />
      </ReactFlow>
    </>
  );
}
