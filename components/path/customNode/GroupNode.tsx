import { Handle, Position } from "reactflow";
import { groupMember } from "../node-edges";
import { IMicroData } from "@/types/type";
import Group from "@/components/Group";
import { IMicroProps } from "@/components/Micro";
import { GroupTypeEnum, MicroStatusEnum } from "@/types/enum";

export default function GroupNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: { label: string };
  isConnectable: boolean;
}) {
  let member: IMicroData[] = groupMember.get(id)?.members || [];
  let groupType = groupMember.get(id)?.type || GroupTypeEnum.Ordered;
  let progress = groupMember.get(id)?.members[0].progress || 0;
  let micros: IMicroProps[] = [];
  member.forEach((value) => {
    micros.push({
      id: value.id,
      title: value.name,
      progress: value.progress,
      type: value.type,
      status:
        progress > 0 && progress < 100
          ? MicroStatusEnum.IN_PROGRESS
          : progress === 100
          ? MicroStatusEnum.COMPLETED
          : MicroStatusEnum.NOT_STARTED,
      isGroup: member.length > 1
    });
  });
  return (
    <div style={{ width: "fit-content" }}>
      <p className="bg-transparent text-left Bold16 absolute -top-8">
        {data.label}
      </p>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Group micros={micros} type={groupType} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
