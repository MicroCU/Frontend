import { groupSettings } from "@/app/path/[id]/setting";
import { GroupTypeEnum } from "@/types/enum";
import { GroupData } from "@/types/type";
import dagre from "dagre";
import { Edge, Node } from "reactflow";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = groupSettings.maxWidth;
const nodeHeight = groupSettings.maxHeight;

export function getDagreLayouted(
    nodes: Node<GroupData, GroupTypeEnum>[],
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

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2
        };

        return node;
    });

    return {
        nodes,
        edges,
    };
};