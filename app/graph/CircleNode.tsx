import Node, { NodeStatusEnum } from "@/components/Node";
import { Handle, Position } from "reactflow";

export default function CircleNode({
  id,
  data,
  type
}: {
  id: string;
  data: { label: string };
  type: string;
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Node status={NodeStatusEnum.CURRENT_PREVIEW} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
