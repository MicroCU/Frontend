import { GroupDisplay, GroupType } from "@/types/enum";
import { getMockData } from "../mock/path";
import { Micro, PathEdge, PathNode } from "@/types/path";
import { MarkerType } from "reactflow";

export function getInitialNodesAndEdges(id: number) {
  const initialNodes: PathNode[] = [];
  const initialEdges: PathEdge[] = [];
  const mockData = getMockData();

  mockData.groups.forEach((group) => {
    const micros: Micro[] = [];
    group.micros.forEach((member) => {
      micros.push({
        id: member.id,
        title: member.name,
        progress: member.progress,
        type: member.type
      });
    });

    const parents: string[] = [];
    mockData.groups.forEach((g) => {
      if (g.nexts.includes(group.id)) {
        parents.push(g.id);
      }
    });

    initialNodes.push({
      id: group.id,
      data: {
        id: group.id,
        next: group.nexts,
        type: group.type,
        name: group.name,
        micros: micros,
        force: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        level: 0
      },
      position: { x: 0, y: 0 },
      draggable: false,
      type:
        group.micros.length == 1
          ? GroupDisplay.Single
          : group.type == GroupType.Ordered
          ? GroupDisplay.Ordered
          : GroupDisplay.Unordered
    });

    group.nexts.forEach((nextId) => {
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

export function getCrossEdge(nodes: PathNode[], edges: PathEdge[]) {
  const result: PathEdge[] = [];

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

export function topologicalSort(nodes: PathNode[], edges: PathEdge[]) {
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

export type ForceFunction =
  | ((nodes: PathNode[]) => void)
  | ((nodes: PathNode[], edges: PathEdge[]) => void);

export function calculateForce(
  nodes: PathNode[],
  edges: PathEdge[],
  generatesForce: ForceFunction[]
) {
  nodes.forEach((node) => {
    node.data.force!.x = 0;
    node.data.force!.y = 0;
  });

  generatesForce.forEach((force) => force(nodes, edges));

  nodes.forEach((node) => {
    if (node.data.force!.x > 300) node.data.force!.x = 300;
    if (node.data.force!.x < -300) node.data.force!.x = -300;
    if (node.data.force!.y > 300) node.data.force!.y = 300;
    if (node.data.force!.y < -300) node.data.force!.y = -300;
  });

  nodes.forEach((node) => {
    node.data.velocity!.x = node.data.velocity!.x >> 1;
    node.data.velocity!.y = node.data.velocity!.y >> 1;
  });

  nodes.forEach((node) => {
    node.data.velocity!.x += node.data.force!.x;
    node.data.velocity!.y += node.data.force!.y;
  });

  nodes.forEach((node) => {
    node.position.x += node.data.velocity!.x;
    node.position.y += node.data.velocity!.y;
  });

  var forceMagnitudes = 0;
  var velocityMagnitudes = 0;

  nodes.forEach((node) => {
    forceMagnitudes += Math.sqrt(
      Math.pow(node.data.force!.x, 2) + Math.pow(node.data.force!.y, 2)
    );
    velocityMagnitudes += Math.sqrt(
      Math.pow(node.data.velocity!.x, 2) + Math.pow(node.data.velocity!.y, 2)
    );
  });

  // console.log({
  //   "force mag": forceMagnitudes,
  //   "force avg": forceMagnitudes / nodes.length,
  //   "velocity mag": velocityMagnitudes,
  //   "velocity avg": velocityMagnitudes / nodes.length
  // });
  return {
    force: forceMagnitudes / nodes.length,
    velocity: velocityMagnitudes / nodes.length
  };
}

export function avoidCollision(nodes: PathNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const ix = nodes[i].position.x + nodes[i].width! / 2;
      const iy = nodes[i].position.y + nodes[i].height! / 2;

      const jx = nodes[j].position.x + nodes[j].width! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;

      const dx = ix - jx;
      const dy = iy - jy;

      const sx = nodes[i].width! / 2 + nodes[j].width! / 2;
      const sy = nodes[i].height! / 2 + nodes[j].height! / 2;
      if (Math.abs(dx) > sx) continue;
      if (Math.abs(dy) > sy) continue;

      const moveX = (sx - Math.abs(dx)) / 2;
      const moveY = (sy - Math.abs(dy)) / 2;

      if (moveX <= moveY) {
        nodes[i].position.x += moveX * Math.sign(dx);
        nodes[j].position.x -= moveX * Math.sign(dx);
      }
      if (moveY <= moveX) {
        nodes[i].position.y += moveY * Math.sign(dy);
        nodes[j].position.y -= moveY * Math.sign(dy);
      }
    }
  }
}

export function fixCrossEdge(nodes: PathNode[], edges: PathEdge[]) {
  const cross = nCrossEdge(nodes, edges);
  if (cross.length === 0) return false;
  for (let i = 0; i < cross.length; i = i + 2) {
    for (let j = 1; j < cross.length; j = j + 2) {
      const edgeA = cross[i];
      const edgeB = cross[j];

      const targetA = nodes.find((node) => node.id === edgeA.target);
      const targetB = nodes.find((node) => node.id === edgeB.target);

      const tempX =
        targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
      const tempY =
        targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
      targetA!.position.x =
        targetB!.position.x + targetB!.width! / 2 - targetA!.width! / 2;
      targetA!.position.y =
        targetB!.position.y + targetB!.height! / 2 - targetA!.height! / 2;
      targetB!.position.x = tempX;
      targetB!.position.y = tempY;

      const nCross = nCrossEdge(nodes, edges);
      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX =
          targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
        const tempY =
          targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
        targetA!.position.x =
          targetB!.position.x + targetB!.width! / 2 - targetA!.width! / 2;
        targetA!.position.y =
          targetB!.position.y + targetB!.height! / 2 - targetA!.height! / 2;
        targetB!.position.x = tempX;
        targetB!.position.y = tempY;
      }
    }
  }
  for (let i = 0; i < cross.length; i = i + 2) {
    for (let j = 1; j < cross.length; j = j + 2) {
      const edgeA = cross[i];
      const edgeB = cross[j];

      const sourceA = nodes.find((node) => node.id === edgeA.source);
      const sourceB = nodes.find((node) => node.id === edgeB.source);

      const tempX =
        sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
      const tempY =
        sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
      sourceA!.position.x =
        sourceB!.position.x + sourceB!.width! / 2 - sourceA!.width! / 2;
      sourceA!.position.y =
        sourceB!.position.y + sourceB!.height! / 2 - sourceA!.height! / 2;
      sourceB!.position.x = tempX;
      sourceB!.position.y = tempY;

      const nCross = nCrossEdge(nodes, edges);

      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX =
          sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
        const tempY =
          sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
        sourceA!.position.x =
          sourceB!.position.x + sourceB!.width! / 2 - sourceA!.width! / 2;
        sourceA!.position.y =
          sourceB!.position.y + sourceB!.height! / 2 - sourceA!.height! / 2;
        sourceB!.position.x = tempX;
        sourceB!.position.y = tempY;
      }
    }
  }

  return false;
}

export function swapPosition(na: PathNode, nb: PathNode) {
  const tempX = na!.position.x + na!.width! / 2 - nb!.width! / 2;
  const tempY = na!.position.y + na!.height! / 2 - nb!.height! / 2;
  na!.position.x = nb!.position.x + nb!.width! / 2 - na!.width! / 2;
  na!.position.y = nb!.position.y + nb!.height! / 2 - na!.height! / 2;
  nb!.position.x = tempX;
  nb!.position.y = tempY;
}

export function fixCrossEdgeBackTrack(nodes: PathNode[], edges: PathEdge[]) {
  const cross = nCrossEdge(nodes, edges);
  if (cross.length === 0) return false;

  const backTrack: {
    nCross: PathEdge[];
    swap: { a: PathNode; b: PathNode }[];
  }[] = [];

  for (let i = 0; i < cross.length; i = i + 2) {
    for (let j = 1; j < cross.length; j = j + 2) {
      const edgeA = cross[i];
      const edgeB = cross[j];

      const ta = nodes.find((node) => node.id === edgeA.target)!;
      const tb = nodes.find((node) => node.id === edgeB.target)!;

      swapPosition(ta, tb);
      backTrack.push({
        nCross: nCrossEdge(nodes, edges),
        swap: [{ a: ta, b: tb }]
      });
      swapPosition(ta, tb);

      const sa = nodes.find((node) => node.id === edgeA.source)!;
      const sb = nodes.find((node) => node.id === edgeB.source)!;

      swapPosition(sa, sb);
      backTrack.push({
        nCross: nCrossEdge(nodes, edges),
        swap: [{ a: sa, b: sb }]
      });
      swapPosition(sa, sb);
    }
  }

  while (backTrack.length > 0) {
    backTrack.sort((a, b) => a.nCross.length - b.nCross.length);
    let { nCross, swap } = backTrack.shift()!;
    swap.forEach(({ a, b }) => swapPosition(a, b));
    if (nCross.length === 0) return true;
    nCross = nCrossEdge(nodes, edges);

    for (let i = 0; i < nCross.length; i = i + 2) {
      for (let j = 1; j < nCross.length; j = j + 2) {
        const edgeA = nCross[i];
        const edgeB = nCross[j];

        const ta = nodes.find((node) => node.id === edgeA.target)!;
        const tb = nodes.find((node) => node.id === edgeB.target)!;

        swapPosition(ta, tb);
        backTrack.push({
          nCross: nCrossEdge(nodes, edges),
          swap: [...swap, { a: ta, b: tb }]
        });
        swapPosition(ta, tb);

        const sa = nodes.find((node) => node.id === edgeA.source)!;
        const sb = nodes.find((node) => node.id === edgeB.source)!;

        swapPosition(sa, sb);
        backTrack.push({
          nCross: nCrossEdge(nodes, edges),
          swap: [...swap, { a: sa, b: sb }]
        });
        swapPosition(sa, sb);
      }
    }
    swap.forEach(({ a, b }) => swapPosition(a, b));
  }

  return false;
}

export function repulsionForcePrimary(nodes: PathNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const ix = nodes[i].position.x + nodes[i].width! / 2;
      const iy = nodes[i].position.y + nodes[i].height! / 2;

      const jx = nodes[j].position.x + nodes[j].width! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;

      const dx = ix - jx;
      const dy = iy - jy;

      let sx = nodes[i].width! / 2 + nodes[j].width! / 2;
      let sy = nodes[i].height! / 2 + nodes[j].height! / 2;
      if (Math.abs(dx) < sx) sx = Math.abs(dx);
      if (Math.abs(dy) < sy) sy = Math.abs(dy);

      const cx = Math.abs(dx) - sx;
      const cy = Math.abs(dy) - sy;
      const c = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));

      let power = nodes[i].width! / 20 + nodes[j].width! / 20;

      const fx = (20 / Math.cosh(c / 40)) * Math.sign(dx);
      const fy = (5 / Math.cosh(c / 40)) * Math.sign(dy);

      nodes[i].data.force!.x += fx;
      nodes[j].data.force!.x -= fx;

      if (nodes[i].data.level! < nodes[j].data.level!) {
        nodes[j].data.force!.y -= fy + fy;
      }

      // console.log("repulse", {
      //   i: nodes[i].data.name,
      //   j: nodes[j].data.name,
      //   power: power,
      //   fx: fx,
      //   fy: fy
      // });
    }
  }
}

export function attractionForce(nodes: PathNode[], edges: PathEdge[]) {
  edges.forEach((edge) => {
    const source = nodes.find((node) => node.id === edge.source);
    const target = nodes.find((node) => node.id === edge.target);

    if (!source || !target) return;

    const ix = source.position.x + source.width! / 2;
    const iy = source.position.y + source.height!;

    const jx = target.position.x + target.width! / 2;
    const jy = target.position.y + target.height! / 2;

    const dx = ix - jx;
    const dy = iy - jy;
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    const fx = -Math.tanh((d - 50) / 50) * 5 * Math.sign(dx);
    const fy = -Math.tanh((dy + 300) / 200) * 5;

    source.data.force!.x += fx;
    target.data.force!.x -= fx;

    if (source.data.level! < target.data.level!) {
      target.data.force!.y -= fy + fy;
    }

    // console.log("attract", {
    //   source: source.data.name,
    //   target: target.data.name,
    //   fx: fx,
    //   fy: fy
    // });
  });
}

function calculateClosestPoint(
  lineStart: { x: number; y: number },
  lineEnd: { x: number; y: number },
  point: { x: number; y: number }
): { x: number; y: number } {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;

  if (dx === 0 && dy === 0) {
    return lineStart;
  }

  const t =
    ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) /
    (dx * dx + dy * dy);

  if (t < 0) {
    return lineStart;
  } else if (t > 1) {
    return lineEnd;
  }

  return {
    x: lineStart.x + t * dx,
    y: lineStart.y + t * dy
  };
}

export function edgeForce(nodes: PathNode[], edges: PathEdge[]) {
  edges.forEach((edge) => {
    const source = nodes.find((node) => node.id === edge.source);
    const target = nodes.find((node) => node.id === edge.target);

    if (!source || !target) return;

    const ix = source.position.x + source.width! / 2;
    const iy = source.position.y + source.height!;

    const jx = target.position.x + target.width! / 2;
    const jy = target.position.y;

    nodes.forEach((node) => {
      if (node.id === source.id || node.id === target.id) return;

      const x = node.position.x + node.width! / 2;
      const y = node.position.y + node.height! / 2;

      const p = calculateClosestPoint(
        { x: ix, y: iy },
        { x: jx, y: jy },
        { x: x, y: y }
      );

      let mx = p.x - x;
      let my = p.y - y;

      let cx = Math.abs(mx) - node.width! / 2;
      let cy = Math.abs(my) - node.height! / 2;
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      const c = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2));

      const fx = ((20 / Math.cosh(Math.abs(c) / 5)) * mx) / Math.abs(mx + my);
      const fy = ((20 / Math.cosh(Math.abs(c) / 5)) * my) / Math.abs(mx + my);

      nodes.find((n) => n.id === node.id)!.data.force!.x -= fx;
      nodes.find((n) => n.id === node.id)!.data.force!.y -= fy;
      nodes.find((n) => n.id === source.id)!.data.force!.x += fx;
      nodes.find((n) => n.id === source.id)!.data.force!.y += fy;
      nodes.find((n) => n.id === target.id)!.data.force!.x += fx;
      nodes.find((n) => n.id === target.id)!.data.force!.y += fy;

      // console.log("edge", {
      //   c: c,
      //   cx: cx,
      //   cy: cy,
      //   fx: fx,
      //   fy: fy
      // });
    });
  });
}

export function levelForce(nodes: PathNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i; j < nodes.length; j++) {
      if (nodes[i].data.level !== nodes[j].data.level! - 1) continue;

      const iy = nodes[i].position.y + nodes[i].height! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;
      const dy = jy - iy;
      const fy = (1 - Math.tanh((dy - 200) / 200)) * 10;

      nodes[j].data.force!.y += fy;

      // console.log("level", {
      //   i: nodes[i].data.name,
      //   j: nodes[j].data.name,
      //   fy: fy,
      //   dy: dy
      // });
    }
  }
}

export function centerForce(nodes: PathNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    const ix = nodes[i].position.x + nodes[i].width! / 2;

    const fx = Math.pow(ix / 100, 2);

    // console.log("center", {
    //   i: nodes[i].data.name,
    //   fx: fx
    // });
  }
}
export function nCrossEdge(nodes: PathNode[], edges: PathEdge[]) {
  const result: PathEdge[] = [];
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
