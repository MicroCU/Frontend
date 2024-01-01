"use client"
import { useMemo, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant, PanOnScrollMode, getNodesBounds, useReactFlow, useViewport } from "reactflow";
import dagre from 'dagre';
import { getInitialNodesAndEdges } from './node-edges';
import { defaultSettings, groupSettings, zoomLevel } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
import InfoNode from "./CustomNode/InfoNode";
import { setInfoSection } from "./util";
import 'reactflow/dist/style.css';
import { calculateNodeSize, findRoot, improvePositionForVerticalGroup } from "./algorithm";

interface EntitreeTreeProps {
    screenWidth: number;
    screenHeight: number;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = groupSettings.width
const nodeHeight = groupSettings.height

const getLayoutedElements = (nodes: Node<any, string | undefined>[], edges: Edge<any>[], direction = 'TB') => {
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
    let rootId = findRoot()
    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        // let nodeSize = calculateNodeSize(node.id)
        // node.width = nodeSize[0]
        // node.height = nodeSize[1]
        node.data.label = node.id // TEST ONLY

        if (node.id === rootId) {
            rootWidth = nodeWidth;
            rootX = node.position.x;
            rootY = node.position.y;
        }

        return node;
    });

    improvePositionForVerticalGroup(nodes);

    return { nodes, edges, rootInfo: {id: rootId, width: rootWidth, x: rootX, y: rootY } };
};

export default function Dagre({ screenWidth, screenHeight }: EntitreeTreeProps) {
    const { initialNodes, initialEdges } = getInitialNodesAndEdges();
    const { setViewport } = useReactFlow();
    const nodeTypes = useMemo(() => ({
        orderedGroupNode: OrderedGroupNode, singleNode: SingleNode,
        unorderedGroupNode: UnorderedGroupNode, infoNode: InfoNode
    }), []);

    // let { lNode, lEdge, rootInfo } = calculateLayoutNodes(initialNodes, initialEdges, screenWidth);
    const { nodes: lNode, edges: lEdge, rootInfo } = getLayoutedElements(
        initialNodes,
        initialEdges
    );
    
    const [nodes, setNodes, onNodesChange] = useNodesState(lNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState(lEdge);
    const bounds = getNodesBounds(nodes);
    if (bounds.height < screenHeight) {
        bounds.height = screenHeight
    }

    // console.log("RootInfo: ", rootInfo, " screenWidth: ", screenWidth)

    // const { x, y, zoom } = useViewport();
    // console.log("Viewport: ", x, y, zoom)

    useEffect(() => {
        setViewport({
            x: -rootInfo.x + screenWidth/2 - groupSettings.width/2,
            y: defaultSettings.rootY,
            zoom: zoomLevel
        });

        setInfoSection(nodes, screenWidth, rootInfo)
    }, [screenWidth]);

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
                // fitViewOptions={{ nodes: nodes }}
                maxZoom={zoomLevel}
                minZoom={zoomLevel}
                translateExtent={[
                    [bounds.x, bounds.y],
                    [bounds.x + bounds.width, bounds.y + bounds.height]
                ]}
                // onlyRenderVisibleElements={true}

                onInit={() => {
                    setViewport({
                        x: -rootInfo.x + screenWidth/2 - groupSettings.width/2,
                        y: defaultSettings.rootY,
                        zoom: zoomLevel
                    });
                }}
            >
                <MiniMap pannable={true} /> {/* PROBLEM */}
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </>
    );
}