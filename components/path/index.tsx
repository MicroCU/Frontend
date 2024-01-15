"use client";
import { useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  Edge,
  Background,
  MiniMap,
  BackgroundVariant,
  PanOnScrollMode,
  getNodesBounds,
  useReactFlow,
  useViewport
} from "reactflow";
import dagre from "dagre";
import { getInitialNodesAndEdges } from "./node-edges";
import { defaultSettings, groupSettings, zoomLevel } from "./setting";
import GroupNode from "./customNode/GroupNode";
import SingleNode from "./customNode/SingleNode";
import InfoNode from "./customNode/InfoNode";
import { setInfoSection } from "./util";
import "reactflow/dist/style.css";
import {
  calculateNodeSize,
  findRoot,
  improvePositionForVerticalGroup
} from "./algorithm";

interface EntitreeTreeProps {
  screenWidth: number;
  screenHeight: number;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = groupSettings.width;
const nodeHeight = groupSettings.height;

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

    let nodeSize = calculateNodeSize(node.id);
    node.width = nodeSize[0];
    node.height = nodeSize[1];

    if (node.type !== "unorderedGroupNode") {
      node.position.x += defaultSettings.singleWidth + defaultSettings.Margin;
    }

    if (node.id === rootId) {
      rootWidth = node.width;
      rootX = node.position.x;
      rootY = node.position.y;
    }

    return node;
  });

  improvePositionForVerticalGroup(nodes);

  return {
    nodes,
    edges,
    rootInfo: { id: rootId, width: rootWidth, x: rootX, y: rootY }
  };
};

export default function DirectedGraph({
  screenWidth,
  screenHeight
}: EntitreeTreeProps) {
  const { initialNodes, initialEdges } = getInitialNodesAndEdges();
  const { setViewport } = useReactFlow();
  const nodeTypes = useMemo(
    () => ({
      groupNode: GroupNode,
      singleNode: SingleNode,
      infoNode: InfoNode
    }),
    []
  );

  const {
    nodes: lNode,
    edges: lEdge,
    rootInfo
  } = getLayoutedElements(initialNodes, initialEdges);

  const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
  const bounds = getNodesBounds(nodes);
  if (bounds.height < screenHeight) {
    bounds.height = screenHeight;
  }

  // const { x, y, zoom } = useViewport();
  // console.log("Viewport: ", x, y, zoom)

  // useEffect(() => {
  //   setViewport({
  //     x: -rootInfo.x + screenWidth / 2 - rootInfo.width / 2,
  //     y: defaultSettings.rootY,
  //     zoom: zoomLevel
  //   });

  //   setInfoSection(nodes, screenWidth, rootInfo);
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
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
      >
        <MiniMap pannable={true} />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
