import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { IGroupData, IMicroData } from "@/types/type";
import { getMicroInGroup } from "@/app/path/[id]/algorithm";

export default function SingleNode({
  id,
  data,
  type
}: {
  id: string;
  data: IGroupData;
  type: string;
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Micro data={data.members[0]} isGroup={false} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={false}
      />
    </>
  );
}
