import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { MicroTypeEnum } from "@/types/enum";
import DegreWrapperSingle from "./DegreWrapperSingle";
import { getGroupMemberData } from "@/app/path/[id]/node-edges";

export default function SingleNode({
  id,
  data,
  type,
  isConnectable
}: {
  id: string;
  data: { label: string };
  type: string;
  isConnectable: boolean;
}) {
  let groupMember = getGroupMemberData();
  let nodeType = groupMember.get(id)?.members[0].type || MicroTypeEnum.VIDEO;
  let progress = groupMember.get(id)?.members[0].progress || 0;
  return (
    <DegreWrapperSingle>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Micro
        id={id}
        title={data.label}
        progress={progress ? progress : 0}
        type={nodeType}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </DegreWrapperSingle>
  );
}
