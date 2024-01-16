import { Handle, Position } from "reactflow";
import { groupMember } from "../node-edges";
import { IMicroData } from "@/types/type";
import Group from "@/components/Group";
import { IMicroProps } from "@/components/Micro";
import { GroupTypeEnum } from "@/types/enum";
import { defaultSettings, groupSettings } from "../setting";

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
      isGroup: member.length > 1
    });
  });
  return (
    <div
      className="flex flex-row justify-center content-center border"
      style={{ width: groupSettings.width, height: groupSettings.height }}
    >
      <div
        className="absolute w-fit h-fit"
        style={{
          top:
            groupType === GroupTypeEnum.Unordered
              ? groupSettings.height / 2 -
                defaultSettings.singleHeight / 2 -
                defaultSettings.Padding
              : groupType === GroupTypeEnum.Ordered && member.length == 2
              ? defaultSettings.singleHeight / 2
              : 0
        }}
      >
        <div className="absolute -top-8 bg-transparent">
          <p className="text-left Bold16 ">{data.label}</p>
        </div>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <Group micros={micros} type={groupType} title={data.label} />
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </div>
  );
}
