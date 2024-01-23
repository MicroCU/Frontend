import { CustomDataEdge, CustomDataNode, hasCrossEdge as numCrossEdge } from "./api";

export type ForceFunction =
  | ((nodes: CustomDataNode[]) => void)
  | ((nodes: CustomDataNode[], edges: CustomDataEdge[]) => void);

export function calculateForce(
  nodes: CustomDataNode[],
  edges: CustomDataEdge[],
  generatesForce: ForceFunction[]
) {
  nodes.forEach((node) => {
    node.data.force.x = 0;
    node.data.force.y = 0;
  });

  generatesForce.forEach((force) => force(nodes, edges));

  nodes.forEach((node) => {
    if (node.data.force.x > 300) node.data.force.x = 300;
    if (node.data.force.x < -300) node.data.force.x = -300;
    if (node.data.force.y > 300) node.data.force.y = 300;
    if (node.data.force.y < -300) node.data.force.y = -300;
  });

  nodes.forEach((node) => {
    node.data.velocity.x = node.data.velocity.x >> 1;
    node.data.velocity.y = node.data.velocity.y >> 1;
  });

  nodes.forEach((node) => {
    node.data.velocity.x += node.data.force.x;
    node.data.velocity.y += node.data.force.y;
  });

  nodes.forEach((node) => {
    node.position.x += node.data.velocity.x;
    node.position.y += node.data.velocity.y;
  });

  var forceMagnitudes = 0;
  var velocityMagnitudes = 0;

  nodes.forEach((node) => {
    forceMagnitudes += Math.sqrt(
      Math.pow(node.data.force.x, 2) + Math.pow(node.data.force.y, 2)
    );
    velocityMagnitudes += Math.sqrt(
      Math.pow(node.data.velocity.x, 2) + Math.pow(node.data.velocity.y, 2)
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

export function avoidCollision(nodes: CustomDataNode[]) {
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

export function fixCrossEdge(nodes: CustomDataNode[], edges: CustomDataEdge[]) {
  const cross = numCrossEdge(nodes, edges);
  if (cross.length === 0) return false;
  for (let i = 0; i < cross.length; i = i + 2) {
    for (let j = 1; j < cross.length; j = j + 2) {
      const edgeA = cross[i];
      const edgeB = cross[j];

      const targetA = nodes.find((node) => node.id === edgeA.target);
      const targetB = nodes.find((node) => node.id === edgeB.target);

      const tempX = targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
      const tempY = targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
      targetA!.position.x =
        targetB!.position.x + targetB!.width! / 2 - targetA!.width! / 2;
      targetA!.position.y =
        targetB!.position.y + targetB!.height! / 2 - targetA!.height! / 2;
      targetB!.position.x = tempX;
      targetB!.position.y = tempY;

      const nCross = numCrossEdge(nodes, edges);
      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX = targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
        const tempY = targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
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

      const tempX = sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
      const tempY = sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
      sourceA!.position.x =
        sourceB!.position.x + sourceB!.width! / 2 - sourceA!.width! / 2;
      sourceA!.position.y =
        sourceB!.position.y + sourceB!.height! / 2 - sourceA!.height! / 2;
      sourceB!.position.x = tempX;
      sourceB!.position.y = tempY;

      const nCross = numCrossEdge(nodes, edges);

      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX = sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
        const tempY = sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
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

export function fixCrossEdgeBackTrack(nodes: CustomDataNode[], edges: CustomDataEdge[]) {
  const cross = numCrossEdge(nodes, edges);
  if (cross.length === 0) return false;

  const backTrack = []

  for (let i = 0; i < cross.length; i = i + 2) {
    for (let j = 1; j < cross.length; j = j + 2) {
      const edgeA = cross[i];
      const edgeB = cross[j];

      const targetA = nodes.find((node) => node.id === edgeA.target);
      const targetB = nodes.find((node) => node.id === edgeB.target);

      const tempX = targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
      const tempY = targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
      targetA!.position.x =
        targetB!.position.x + targetB!.width! / 2 - targetA!.width! / 2;
      targetA!.position.y =
        targetB!.position.y + targetB!.height! / 2 - targetA!.height! / 2;
      targetB!.position.x = tempX;
      targetB!.position.y = tempY;

      const nCross = numCrossEdge(nodes, edges);
      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX = targetA!.position.x + targetA!.width! / 2 - targetB!.width! / 2;
        const tempY = targetA!.position.y + targetA!.height! / 2 - targetB!.height! / 2;
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

      const tempX = sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
      const tempY = sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
      sourceA!.position.x =
        sourceB!.position.x + sourceB!.width! / 2 - sourceA!.width! / 2;
      sourceA!.position.y =
        sourceB!.position.y + sourceB!.height! / 2 - sourceA!.height! / 2;
      sourceB!.position.x = tempX;
      sourceB!.position.y = tempY;

      const nCross = numCrossEdge(nodes, edges);

      if (nCross.length < cross.length) {
        return true;
      } else {
        const tempX = sourceA!.position.x + sourceA!.width! / 2 - sourceB!.width! / 2;
        const tempY = sourceA!.position.y + sourceA!.height! / 2 - sourceB!.height! / 2;
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

export function repulsionForcePrimary(nodes: CustomDataNode[]) {
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

      nodes[i].data.force.x += fx;
      nodes[j].data.force.x -= fx;

      if (nodes[i].data.level < nodes[j].data.level) {
        nodes[j].data.force.y -= fy + fy;
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

export function attractionForce(
  nodes: CustomDataNode[],
  edges: CustomDataEdge[]
) {
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

    source.data.force.x += fx;
    target.data.force.x -= fx;

    if (source.data.level < target.data.level) {
      target.data.force.y -= fy + fy;
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

export function edgeForce(nodes: CustomDataNode[], edges: CustomDataEdge[]) {
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

      nodes.find((n) => n.id === node.id)!.data.force.x -= fx;
      nodes.find((n) => n.id === node.id)!.data.force.y -= fy;
      nodes.find((n) => n.id === source.id)!.data.force.x += fx;
      nodes.find((n) => n.id === source.id)!.data.force.y += fy;
      nodes.find((n) => n.id === target.id)!.data.force.x += fx;
      nodes.find((n) => n.id === target.id)!.data.force.y += fy;

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

export function levelForce(nodes: CustomDataNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i; j < nodes.length; j++) {
      if (nodes[i].data.level !== nodes[j].data.level - 1) continue;

      const iy = nodes[i].position.y + nodes[i].height! / 2;
      const jy = nodes[j].position.y + nodes[j].height! / 2;
      const dy = jy - iy;
      const fy = (1 - Math.tanh((dy - 200) / 200)) * 10;

      nodes[j].data.force.y += fy;

      // console.log("level", {
      //   i: nodes[i].data.name,
      //   j: nodes[j].data.name,
      //   fy: fy,
      //   dy: dy
      // });
    }
  }
}

export function centerForce(nodes: CustomDataNode[]) {
  for (let i = 0; i < nodes.length; i++) {
    const ix = nodes[i].position.x + nodes[i].width! / 2;

    const fx = Math.pow(ix / 100, 2);

    // console.log("center", {
    //   i: nodes[i].data.name,
    //   fx: fx
    // });
  }
}
