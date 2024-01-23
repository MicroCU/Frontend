import { GroupData } from "@/app/path/[id]/api";
import Micro from "@/components/Micro";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function SingleNode({
  data,
  isConnectable
}: {
  data: GroupData;
  isConnectable: boolean;
}) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Micro data={data.micros[0]} isGroup={false} />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(SingleNode);
