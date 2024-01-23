import { GroupTypeEnum, MicroTypeEnum } from "@/types/enum";
import { Edge, MarkerType, Node } from "reactflow";
import { mockData } from "./data";

export interface GroupData {
  name: string;
  parents: string[];
  micros: MicroData[];
  force: { x: number; y: number };
  velocity: { x: number; y: number };
  level: number;
}

export interface MicroData {
  id: string;
  title: string;
  progress: number;
  type: MicroTypeEnum;
  force: { x: number; y: number };
  velocity: { x: number; y: number };
  level: number;
}

export type CustomDataNode = Node<GroupData, GroupTypeEnum>;
export type CustomDataEdge = Edge<undefined>;

export function getInitialNodesAndEdges(id: number) {
  const initialNodes: CustomDataNode[] = [];
  const initialEdges: CustomDataEdge[] = [];

  mockData[id].groups.forEach((group) => {
    const members: MicroData[] = [];
    group.members.forEach((member) => {
      members.push({
        id: member.id,
        title: member.name,
        progress: member.progress,
        type: member.type,
        force: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        level: 0
      });
    });

    const parents: string[] = [];
    mockData[id].groups.forEach((g) => {
      if (g.next.includes(group.id)) {
        parents.push(g.id);
      }
    });

    initialNodes.push({
      id: group.id,
      data: {
        name: group.name,
        parents: parents,
        micros: members,
        force: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        level: 0
      },
      position: { x: 0, y: 0 },
      draggable: true,
      type: group.type
    });

    group.next.forEach((nextId) => {
      initialEdges.push({
        id: `edge-${group.id}-${nextId}`,
        source: group.id,
        target: nextId,
        animated: false,
        type: "default",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#5C4EFF",
          width: 25,
          height: 25
        },
        style: { stroke: "#5C4EFF", strokeWidth: 2 }
      });
    });
  });
  topologicalSort(initialNodes, initialEdges);
  return { initialNodes, initialEdges };
}

function topologicalSort(nodes: CustomDataNode[], edges: CustomDataEdge[]) {
  const adjacencyList = edges.reduce<Record<string, string[]>>(
    (acc, { source, target }) => {
      if (!acc[source]) acc[source] = [];
      acc[source].push(target);
      return acc;
    },
    {}
  );

  const visited: Record<string, boolean> = {};
  const level: Record<string, number> = {};

  for (const node of nodes) {
    level[node.id] = 0;
  }

  // The DFS function used for the topological sort
  const dfs = (id: string) => {
    visited[id] = true;

    const neighbors = adjacencyList[id] || [];

    for (const neighborId of neighbors) {
      if (!visited[neighborId]) {
        level[neighborId] = Math.max(level[id] + 1, level[neighborId]);
        dfs(neighborId);
      } else {
        level[neighborId] = Math.max(level[id] + 1, level[neighborId]);
      }
    }
  };

  // Calling the DFS function for every node
  nodes.forEach((node) => {
    if (!visited[node.id]) {
      dfs(node.id);
    }
  });

  // Updating the input nodes' level
  for (const node of nodes) {
    node.data.level = level[node.id];
    node.position.y = level[node.id] * 500;
  }
}

export function hasCrossEdge(nodes: CustomDataNode[], edges: CustomDataEdge[]) {
  const result: CustomDataEdge[] = [];
  const positions = nodes.reduce(
    (obj, node) => ({
      ...obj,
      [node.id]: {
        x: node.position.x + node.width! / 2,
        y: node.position.y + node.height! / 2
      }
    }),
    {} as { [key: string]: { x: number; y: number } }
  );
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      // we consider that (x1,y1) and (x2,y2) are from edge[i] and (x3,y3) and (x4,y4) are from edge [j]
      if (
        edges[i].source === edges[j].source ||
        edges[i].source === edges[j].target ||
        edges[i].target === edges[j].source ||
        edges[i].target === edges[j].target
      )
        continue;

      var x1 = positions[edges[i].source].x,
        y1 = positions[edges[i].source].y;
      var x2 = positions[edges[i].target].x,
        y2 = positions[edges[i].target].y;

      var x3 = positions[edges[j].source].x,
        y3 = positions[edges[j].source].y;
      var x4 = positions[edges[j].target].x,
        y4 = positions[edges[j].target].y;

      // calculate the direction of the three consecutive segments ab, bc and cd by cross product.
      var abc = (x2 - x1) * (y3 - y2) - (x3 - x2) * (y2 - y1);
      var abd = (x2 - x1) * (y4 - y2) - (x4 - x2) * (y2 - y1);
      var cda = (x4 - x3) * (y1 - y4) - (x1 - x4) * (y4 - y3);
      var cdb = (x4 - x3) * (y2 - y4) - (x2 - x4) * (y4 - y3);
      // The intersection of two lines/segments lies on both lines/segments, if the direction signs are different
      if (abc * abd <= 0 && cda * cdb <= 0) {
        result.push(edges[i], edges[j]);
      }
    }
  }
  return result;
}
