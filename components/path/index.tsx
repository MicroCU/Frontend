"use client";
import { useEffect, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  Edge,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  PanOnScrollMode,
  getNodesBounds,
  useReactFlow,
  useViewport
} from "reactflow";
import dagre from "dagre";
import { getInitialNodesAndEdges } from "./node-edges";
import { defaultSettings, groupSettings } from "./setting";
import GroupNode from "./customNode/GroupNode";
import SingleNode from "./customNode/SingleNode";
import "reactflow/dist/style.css";
import { calculateNodeSize, findRoot } from "./algorithm";

interface pathProps {
  screenWidth: number;
  screenHeight: number;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = groupSettings.maxWidth;
const nodeHeight = groupSettings.maxHeight;

const getLayoutedElements = (
  nodes: Node<any, string | undefined>[],
  edges: Edge<any>[],
  direction = "TB"
) => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  let rootWidth = 0;
  let rootX = 0;
  let rootY = 0;
  let rootId = findRoot();
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    let nodeSize = calculateNodeSize(node.id, node.type);
    node.width = nodeSize.width;
    node.height = nodeSize.height;

    if (node.id === rootId) {
      rootWidth = node.width;
      rootX = node.position.x;
      rootY = node.position.y;
    }

    return node;
  });

  // improveHorizontalPosition(nodes);
  // improvePositionForVerticalGroup(nodes);

  return {
    nodes,
    edges,
    rootInfo: { id: rootId, width: rootWidth, x: rootX, y: rootY }
  };
};

export default function DirectedGraph({
  screenWidth,
  screenHeight
}: pathProps) {
  const { initialNodes, initialEdges } = getInitialNodesAndEdges();
  const { setViewport } = useReactFlow();
  const nodeTypes = useMemo(
    () => ({
      groupNode: GroupNode,
      singleNode: SingleNode
    }),
    []
  );

  const {
    nodes: lNode,
    edges: lEdge,
    rootInfo
  } = getLayoutedElements(initialNodes, initialEdges);

  console.log("Root: ", rootInfo);

  const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
  const bounds = getNodesBounds(nodes);

  if (bounds.height < screenHeight) {
    bounds.height = screenHeight;
  }

  const { x, y, zoom } = useViewport();
  console.log("Viewport: ", x, y, zoom);

  // useEffect(() => {
  //   setViewport({
  //     x: -rootInfo.x + screenWidth / 2 - rootInfo.width / 2,
  //     y: 0,
  //     zoom: zoom
  //   });
  // }, [screenWidth]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        selectNodesOnDrag={false}
        panOnDrag={false}
        panOnScroll={true}
        panOnScrollMode={PanOnScrollMode.Free}
        fitView
        // fitViewOptions={{
        //   includeHiddenNodes: true,
        //   nodes: nodes
        // }}
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
        // onInit={() => {
        //   setViewport({
        //     x: -rootInfo.x,
        //     y: rootInfo.y,
        //     zoom: 0.5
        //   });
        // }}
      >
        {/* <Controls />
        <MiniMap pannable zoomable /> */}
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
