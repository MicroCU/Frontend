import { Handle, Position } from "reactflow";
import Group from "@/components/Group";
import { GroupTypeEnum } from "@/types/enum";
import { getMicroInGroup } from "@/app/path/[id]/algorithm";
import { getGroupMemberData } from "@/app/path/[id]/node-edges";
export default function TendonGroupNode({
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
  let groupType = groupMember.get(id)?.type || GroupTypeEnum.Ordered; // Ordered or Unordered
  let micros = getMicroInGroup(id); // Get micros which is a member of this group
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Group
        micros={micros}
        type={groupType}
        title={data.label}
        id={id}
        isScrollable={false}
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
