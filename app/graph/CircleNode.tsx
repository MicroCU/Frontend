import Node from "@/components/Node";
import { NodeData } from "@/types/type";
import { Handle, Position } from "reactflow";

export default function CircleNode({
  id,
  data,
  type
}: {
  id: string;
  data: NodeData;
  type: string;
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Node status={data.status} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
