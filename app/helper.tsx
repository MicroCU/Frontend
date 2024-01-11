import { DataEdge, DataNode } from "./page";

export function TopologicalSort(nodes: DataNode[], edges: DataEdge[]) {
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
    node.level = level[node.id];
  }
}

export function calculateCollide(nodes: DataNode[], r: number) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];
      // Compute the distance between the nodes
      const dx = nodeA.position.x - nodeB.position.x || 1;
      const dy = nodeA.position.y - nodeB.position.y || 1;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // If distance is smaller than 2 * radius then the node circles intersect
      if (dist < 2 * r) {
        const overlap = 2 * r - dist;
        const percentOverlap = overlap / dist;

        const offsetX = dx * (0.5 * percentOverlap);
        const offsetY = dy * (0.5 * percentOverlap);

        // Nudge each node away from each other
        nodeA.position.x += offsetX;
        nodeA.position.y += offsetY;

        nodeB.position.x -= offsetX;
        nodeB.position.y -= offsetY;
      }
    }
  }
}

export function calculateForce(nodes: DataNode[]) {
  nodes.forEach((node) => {
    node.velocity.x *= 0.2;
    node.velocity.y *= 0.2;
  });
  nodes.forEach((node) => {
    if (node.force.x > 300 || node.force.x < -300) node.force.x = 300;
    if (node.force.y > 300 || node.force.y < -300) node.force.y = 300;
    node.velocity.x += node.force.x;
    node.velocity.y += node.force.y;
  });
  nodes.forEach((node) => {
    node.position.x += node.velocity.x;
    node.position.y += node.velocity.y;
  });

  const forceMagnitudes = nodes.map((node) =>
    Math.sqrt(node.force.x ** 2 + node.force.y ** 2)
  );
  const totalForce = forceMagnitudes.reduce((total, force) => total + force, 0);
  const avgForce = totalForce / nodes.length;

  const avgVelocity =
    nodes.reduce(
      (total, node) =>
        total + Math.sqrt(node.velocity.x ** 2 + node.velocity.y ** 2),
      0
    ) / nodes.length;
  console.log(nodes, "Avg force", avgForce, "Avg velocity", avgVelocity);
}

export function calculateRepulsionForce(nodes: DataNode[], rebound = 100000) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];

      const dx = nodeB.position.x - nodeA.position.x;
      const dy = nodeB.position.y - nodeA.position.y;

      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 10) distance = 10;
      //   const fx = (rebound / (distance * distance)) * Math.sign(dx);
      //   const fy = (rebound / (distance * distance)) * Math.sign(dy);
      const fx = (1 / Math.cosh(distance / 80)) * 20 * Math.sign(dx);
      const fy = (1 / Math.cosh(distance / 80)) * 20 * Math.sign(dy);

      console.log("repulse", nodeA.id, nodeB.id, distance, fx, fy);

      nodeA.force.x -= fx;
      nodeA.force.y -= fy;

      nodeB.force.x += fx;
      nodeB.force.y += fy;
    }
  }
}

export function calculateSpring(
  nodes: DataNode[],
  edges: DataEdge[],
  length = 200,
  elasticity = 500,
  straight = 100
) {
  for (const edge of edges) {
    const nodeA = nodes.find((node) => node.id === edge.source)!;
    const nodeB = nodes.find((node) => node.id === edge.target)!;

    const dx = nodeB.position.x - nodeA.position.x;
    const dy = nodeB.position.y - nodeA.position.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const fx =
      -Math.tanh((distance - length) / elasticity) * straight * Math.sign(dx);
    const fy =
      -Math.tanh((distance - length) / elasticity) * straight * Math.sign(dy);
    console.log("spring", nodeA.id, nodeB.id, distance, fx, fy);

    nodeA.force.x -= fx;
    nodeA.force.y -= fy;

    nodeB.force.x += fx;
    nodeB.force.y += fy;
  }
}

export function calculateLevel(nodes: DataNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];
      if (nodeA.level + 1 !== nodeB.level) continue;

      const dy = nodeB.position.y - nodeA.position.y;

      const fy = 1 - Math.tanh((dy - 200) / 10) * 5;
    //   const fy = 1 - Math.tanh((dy - 200) / 10) * 15;
      console.log("level", nodeA.id, nodeB.id, dy, fy);

      nodeA.force.y -= fy;
      nodeB.force.y += fy;
    }
  }
}

export function hasCrossEdge(nodes: DataNode[], edges: DataEdge[]) {
  const result: DataEdge[] = [];
  const positions = nodes.reduce(
    (obj, node) => ({ ...obj, [node.id]: node.position }),
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
