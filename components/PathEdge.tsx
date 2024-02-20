import { memo, useCallback } from "react";
import { EdgeProps, Position, getStraightPath, useStore } from "reactflow";
import "reactflow/dist/style.css";

function PathEdge({ id, source, target, markerEnd, style }: EdgeProps) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );

  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty
  });

  if (edgePath == "M NaN,NaNL NaN,NaN") return null;

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default memo(PathEdge);

function getEdgeParams(source: any, target: any) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos
  };
}

function getNodeIntersection(intersectionNode: any, targetNode: any) {
  const intersectionNodeCenter = {
    x: intersectionNode.positionAbsolute.x + intersectionNode.width / 2,
    y: intersectionNode.positionAbsolute.y + intersectionNode.height / 2
  };

  const targetNodeCenter = {
    x: targetNode.positionAbsolute.x + targetNode.width / 2,
    y: targetNode.positionAbsolute.y + targetNode.height / 2
  };

  const r = intersectionNode.width / 2;

  const dx = targetNodeCenter.x - intersectionNodeCenter.x;
  const dy = targetNodeCenter.y - intersectionNodeCenter.y;

  const mag = Math.sqrt(dx * dx + dy * dy);
  const dir = { x: dx / mag, y: dy / mag };

  const x = intersectionNodeCenter.x + dir.x * r;
  const y = intersectionNodeCenter.y + dir.y * r;

  return { x, y };
}

function getEdgePosition(
  node: { positionAbsolute: any },
  intersectionPoint: { x: any; y: any }
) {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}
