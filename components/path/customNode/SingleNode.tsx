import { Handle, Position } from "reactflow";
import Micro from "@/components/Micro";
import { groupMember } from "../node-edges";
import { MicroTypeEnum } from "@/types/enum";
import { defaultSettings, groupSettings } from "../setting";
import { calculateNodeSize } from "../algorithm";

export default function SingleNode({
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
  let nodeType = groupMember.get(id)?.members[0].type || MicroTypeEnum.VIDEO;
  let progress = groupMember.get(id)?.members[0].progress || 0;
  return (
    <>
      {/* <div
       className="flex flex-row justify-center content-center"
       style={{ width: nodeSize.width, height: nodeSize.height }}
     > */}
      {/* <div
        className="absolute w-fit h-fit"
        style={{
          top: groupSettings.maxHeight / 2 - defaultSettings.singleHeight / 2
        }}
      > */}
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
      />
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
