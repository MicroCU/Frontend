import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { MicroTypeEnum } from "@/types/enum";
import { getGroupMemberData } from "@/app/path/[id]/node-edges";

export default function TendonSingleNode({
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
  let nodeType = groupMember.get(id)?.members[0].type || MicroTypeEnum.VIDEO; // VIDEO or PRACTICE or TEST
  let progress = groupMember.get(id)?.members[0].progress || 0; // 0 - 100
  return (
    <>
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
    </>
  );
}
