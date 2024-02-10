import Node from "@/components/Node";
import { UndirectedGraphNodeData } from "@/types/type";
import { Handle, Position } from "reactflow";

export default function CircleNode({
  id,
  data,
  type
}: {
  id: string;
  data: UndirectedGraphNodeData;
  type: string;
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Node status={data.status} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
