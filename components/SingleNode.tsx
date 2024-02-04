import Micro from "@/components/Micro";
import { Group } from "@/types/path";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function SingleNode({
  data,
  isConnectable
}: {
  data: Group;
  isConnectable: boolean;
}) {
  console.log("data", data);
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
