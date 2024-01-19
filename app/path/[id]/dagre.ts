import { groupSettings } from "@/app/path/[id]/setting";
import dagre from "dagre";
import { Edge, Node } from "reactflow";
import { findRoot } from "./algorithm";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = groupSettings.maxWidth;
const nodeHeight = groupSettings.maxHeight;

export function getLayoutedElements(
    nodes: Node<any, string | undefined>[],
    edges: Edge<any>[],
    direction = "TB"
) {
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

        // let nodeSize = calculateNodeSize(node.id, node.type);
        // node.width = nodeSize.width;
        // node.height = nodeSize.height;

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