import { Handle, Position } from "reactflow";
import { IGroupData } from "@/types/type";
import Group from "@/components/Group";
import { GroupTypeEnum } from "@/types/enum";
import DegreWrapperGroup from "./DegreWrapperGroup";

export default function UnorderedGroup({
  id,
  data,
  type
}: {
  id: string;
  data: IGroupData;
  type: string;
}) {
  return (
    <DegreWrapperGroup
      groupType={GroupTypeEnum.Unordered}
      memberLength={data.members.length}
    >
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Group
        micros={data.members}
        type={GroupTypeEnum.Unordered}
        title={data.name}
        id={id}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={false}
      />
    </DegreWrapperGroup>
  );
}
