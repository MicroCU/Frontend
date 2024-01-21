import { Handle, Position } from "reactflow";
import { IGroupData } from "@/types/type";
import Group from "@/components/Group";
import { getGroupData } from "@/app/path/[id]/algorithm";
import { GroupTypeEnum } from "@/types/enum";

export default function OrderedGroup({
  id,
  data,
  type
}: {
  id: string;
  data: IGroupData;
  type: string;
}) {
  return (
    <div className="nodrag nowheel">
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Group
        micros={data.members}
        type={GroupTypeEnum.Ordered}
        title={data.name}
        id={id}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={false}
      />
    </div>
  );
}
