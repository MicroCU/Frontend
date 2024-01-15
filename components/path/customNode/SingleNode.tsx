import { Handle, Position } from "reactflow";
import Micro, { MicroStatusEnum, MicroTypeEnum } from "@/components/Micro";
import { groupMember } from "../node-edges";
import { MicroNodeType } from "@/types/enum";

export default function SingleNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: { label: string };
  isConnectable: boolean;
}) {
  let nodeType = groupMember.get(id)?.members[0].type;
  let progress = groupMember.get(id)?.members[0].progress;
  return (
    <div className="w-full">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Micro
        id={id}
        title={data.label}
        progress={progress ? progress : 0}
        type={
          nodeType === MicroNodeType.Micro
            ? MicroTypeEnum.VIDEO
            : nodeType === MicroNodeType.Practice
            ? MicroTypeEnum.PRACTICE
            : MicroTypeEnum.TEST
        }
        status={
          progress && progress > 0 && progress < 100
            ? MicroStatusEnum.IN_PROGRESS
            : progress && progress === 100
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
  );
}
