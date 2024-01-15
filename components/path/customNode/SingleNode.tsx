import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { groupMember } from "../node-edges";
import { MicroTypeEnum, MicroStatusEnum } from "@/types/enum";
import { defaultSettings, groupSettings } from "../setting";

export default function SingleNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: { label: string };
  isConnectable: boolean;
}) {
  let nodeType = groupMember.get(id)?.members[0].type || MicroTypeEnum.VIDEO;
  let progress = groupMember.get(id)?.members[0].progress || 0;
  return (
    <div
      className="relative flex flex-row justify-center content-center border"
      style={{ width: groupSettings.width, height: groupSettings.height }}
    >
      <div
        className="absolute w-fit h-fit"
        style={{
          top: groupSettings.height / 2 - defaultSettings.singleHeight / 2
        }}
      >
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
          status={
            progress > 0 && progress < 100
              ? MicroStatusEnum.IN_PROGRESS
              : progress === 100
              ? MicroStatusEnum.COMPLETED
              : MicroStatusEnum.NOT_STARTED
          }
        />
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
