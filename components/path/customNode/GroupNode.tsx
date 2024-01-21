import { Handle, Position } from "reactflow";
import { IMicroData } from "@/types/type";
import Group from "@/components/Group";
import { GroupTypeEnum } from "@/types/enum";
import DegreWrapperGroup from "./DegreWrapperGroup";
import { getMicroInGroup } from "@/app/path/[id]/algorithm";
import { getGroupMemberData } from "@/app/path/[id]/node-edges";

export default function GroupNode({
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
  let member: IMicroData[] = groupMember.get(id)?.members || [];
  let groupType = groupMember.get(id)?.type || GroupTypeEnum.Ordered;
  let micros = getMicroInGroup(id);

  return (
    <DegreWrapperGroup groupType={groupType} memberLength={member.length}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Group micros={micros} type={groupType} title={data.label} id={id} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </DegreWrapperGroup>
  );
}
