import { GraphEdge, GraphNode } from "@/types/graph";
import { calculateClosestPoint } from "./path";

export type ForceFunction =
  | ((nodes: GraphNode[]) => void)
  | ((nodes: GraphNode[], edges: GraphEdge[]) => void);

export function calculateForce(
  nodes: GraphNode[],
  edges: GraphEdge[],
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
  return {
    force: forceMagnitudes / nodes.length,
    velocity: velocityMagnitudes / nodes.length
  };
}

export function centerForce(nodes: GraphNode[]) {
  nodes.forEach((node) => {
    const ix = node.position.x / 400;
    const iy = node.position.y / 300;

    const fx = ix * ix * Math.sign(ix);
    const fy = iy * iy * Math.sign(iy);

    node.data.force!.x -= fx;
    node.data.force!.y -= fy;
  });
}

export function repulsionForce(nodes: GraphNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const ix = nodes[i].position.x + nodes[i].width! / 2;
      const iy = nodes[i].position.y + nodes[i].height! / 2;

      const jx = nodes[j].position.x + nodes[j].width! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;

      var dx = ix - jx;
      var dy = iy - jy;

      let distanceSq = dx * dx + dy * dy;
      if (distanceSq < 0.01) distanceSq = 0.01;

      let distance = Math.sqrt(distanceSq);
      let force = 50000 / distanceSq;

      dx /= distance;
      dy /= distance;

      let fx = dx * force;
      let fy = dy * force;

      nodes[i].data.force!.x += fx;
      nodes[i].data.force!.y += fy;

      nodes[j].data.force!.x -= fx;
      nodes[j].data.force!.y -= fy;
    }
  }
}

export function attractionForce(nodes: GraphNode[], edges: GraphEdge[]) {
  edges.forEach((edge) => {
    const source = nodes.find((node) => node.id === edge.source)!;
    const target = nodes.find((node) => node.id === edge.target)!;

    const ix = source.position.x + source.width! / 2;
    const iy = source.position.y + source.height! / 2;

    const jx = target.position.x + target.width! / 2;
    const jy = target.position.y + target.height! / 2;

    var dx = ix - jx;
    var dy = iy - jy;

    var distance = Math.sqrt(dx * dx + dy * dy);

    const fx = 0.02 * dx;
    const fy = 0.02 * dy;

    source.data.force!.x -= fx;
    source.data.force!.y -= fy;

    target.data.force!.x += fx;
    target.data.force!.y += fy;
  });
}

export function edgeForce(nodes: GraphNode[], edges: GraphEdge[]) {
  edges.forEach((edge) => {
    const source = nodes.find((node) => node.id === edge.source);
    const target = nodes.find((node) => node.id === edge.target);

    if (!source || !target) return;

    const ix = source.position.x + source.width! / 2;
    const iy = source.position.y + source.height! / 2;

    const jx = target.position.x + target.width! / 2;
    const jy = target.position.y + target.height! / 2;

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

      const fx = ((10 / Math.cosh(Math.abs(c) / 5)) * mx) / Math.abs(mx + my);
      const fy = ((10 / Math.cosh(Math.abs(c) / 5)) * my) / Math.abs(mx + my);

      nodes.find((n) => n.id === node.id)!.data.force!.x -= fx;
      nodes.find((n) => n.id === node.id)!.data.force!.y -= fy;
      nodes.find((n) => n.id === source.id)!.data.force!.x += fx;
      nodes.find((n) => n.id === source.id)!.data.force!.y += fy;
      nodes.find((n) => n.id === target.id)!.data.force!.x += fx;
      nodes.find((n) => n.id === target.id)!.data.force!.y += fy;
    });
  });
}

export function avoidCollision(nodes: GraphNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const ix = nodes[i].position.x + nodes[i].width! / 2;
      const iy = nodes[i].position.y + nodes[i].height! / 2;

      const jx = nodes[j].position.x + nodes[j].width! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;

      if (ix === jx && iy === jy) {
        nodes[i].position.x += Math.random() * 10 - 5;
        nodes[i].position.y += Math.random() * 10 - 5;
        nodes[j].position.x += Math.random() * 10 - 5;
        nodes[j].position.y += Math.random() * 10 - 5;
        continue;
      }

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

export function initPosition(nodes: GraphNode[]) {
  const r = 300;
  const angle = (2 * Math.PI) / nodes.length;

  for (let i = 0; i < nodes.length; i++) {
    const x = r * Math.cos(angle * i);
    const y = r * Math.sin(angle * i);
    nodes[i].position.x = x;
    nodes[i].position.y = y;
  }
}
