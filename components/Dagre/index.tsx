"use client"
import { useMemo, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, ConnectionLineType, Node, Edge, Background, MiniMap, BackgroundVariant, PanOnScrollMode, getNodesBounds, useReactFlow, useViewport } from "reactflow";
import dagre from 'dagre';
import { getInitialNodesAndEdges } from './node-edges';
import { defaultSettings, zoomLevel } from "./setting";
import OrderedGroupNode from "./CustomNode/OrderedGroupNode";
import SingleNode from "./CustomNode/SingleNode";
import UnorderedGroupNode from "./CustomNode/UnorderedGroupNode";
import InfoNode from "./CustomNode/InfoNode";
import { setInfoSection } from "./util";
import 'reactflow/dist/style.css';

interface EntitreeTreeProps {
    screenWidth: number;
    screenHeight: number;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = defaultSettings.singleWidth*3 + defaultSettings.Padding*2
const nodeHeight = defaultSettings.singleHeight*3 + defaultSettings.Padding*2

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
    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        if (node.id === "1") {  // TODO: add algo for find Root
            rootWidth = nodeWidth;
            rootX = node.position.x;
            rootY = node.position.y;

            console.log("Root: ", node.position.x, " --> ", nodeWithPosition.x)
        }

        return node;
    });

    return { nodes, edges, rootInfo: {width: rootWidth, x: rootX, y: rootY } };
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

    console.log("RootInfo: ", rootInfo)

    // const { x, y, zoom } = useViewport();
    // console.log("Viewport: ", x, y, zoom)

    useEffect(() => {
        setViewport({
            x: rootInfo.x,
            y: rootInfo.y,
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
                        x: rootInfo.x - screenWidth/2,
                        y: rootInfo.y,
                        zoom: zoomLevel
                    });
                }}
            >
                <MiniMap pannable={true} />
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
        </>
    );
}