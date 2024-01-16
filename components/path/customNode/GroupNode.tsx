import { Handle, Position } from "reactflow";
import { groupMember } from "../node-edges";
import { IMicroData } from "@/types/type";
import Group from "@/components/Group";
import { IMicroProps } from "@/components/Micro";
import { GroupTypeEnum } from "@/types/enum";
import { defaultSettings, groupSettings } from "../setting";
import { calculateNodeSize } from "../algorithm";

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
    <>
      {/* <div
      className="flex flex-row justify-center content-center border"
      style={{ width: nodeSize.width, height: nodeSize.height }}
    > */}
      {/* <div
        className="absolute w-fit h-fit"
        style={{
          top:
            groupType === GroupTypeEnum.Unordered
              ? groupSettings.maxHeight / 2 -
                2 * defaultSettings.Padding -
                defaultSettings.groupTitleHigh
              : groupType === GroupTypeEnum.Ordered && member.length == 2
              ? defaultSettings.singleHeight / 2 +
                defaultSettings.groupTitleHigh / 2
              : 0
        }}
      > */}
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
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
