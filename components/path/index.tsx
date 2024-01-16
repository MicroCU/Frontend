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
import { findRoot } from "./algorithm";

interface EntitreeTreeProps {
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

    if (node.type === "groupNode") {
      let componentData = document
        .getElementById(`group-display-${node.id}`)
        ?.getBoundingClientRect();
      node.width = componentData ? componentData.width : 0;
      node.height = componentData ? componentData.height : 0;
    } else {
      let componentData = document
        .getElementById(`micro-display-${node.id}`)
        ?.getBoundingClientRect();
      node.width = componentData ? componentData.width : 0;
      node.height = componentData ? componentData.height : 0;
    }

    if (node.id === rootId) {
      // rootWidth = node.width;
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
}: EntitreeTreeProps) {
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

  console.log(lNode);
  const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
  const bounds = getNodesBounds(nodes);

  // if (bounds.height < screenHeight) {
  //   bounds.height = screenHeight;
  // }

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
        fitViewOptions={{
          includeHiddenNodes: true,
          nodes: nodes
        }}
        translateExtent={[
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y + bounds.height]
        ]}
      >
        <Controls />
        <MiniMap pannable zoomable />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </>
  );
}
