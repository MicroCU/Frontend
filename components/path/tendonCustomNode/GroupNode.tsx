import { Handle, Position } from "reactflow";
import { groupMember } from "../../../app/path/[id]/node-edges";
import Group from "@/components/Group";
import { GroupTypeEnum } from "@/types/enum";
import { getMicroInGroup } from "@/app/path/[id]/algorithm";
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
