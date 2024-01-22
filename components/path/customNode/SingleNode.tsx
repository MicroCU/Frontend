import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { GroupData } from "@/types/type";
import DegreWrapperSingle from "./DegreWrapperSingle";

export default function SingleNode({
  id,
  data,
  type
}: {
  id: string;
  data: GroupData;
  type: string;
}) {
  return (
    <DegreWrapperSingle>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Micro data={data.members[0]} isGroup={false} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={false}
      />
    </DegreWrapperSingle>
  );
}
