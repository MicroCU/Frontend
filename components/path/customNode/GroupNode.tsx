import { Handle, Position } from "reactflow";
import { groupMember } from "../../../app/path/[id]/node-edges";
import { IMicroData } from "@/types/type";
import Group from "@/components/Group";
import { IMicroProps } from "@/components/Micro";
import { GroupTypeEnum } from "@/types/enum";
import DegreWrapperGroup from "./DegreWrapperGroup";
import { getMicroInGroup } from "@/app/path/[id]/algorithm";
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
