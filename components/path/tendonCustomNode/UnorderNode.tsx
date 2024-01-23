import { GroupData } from "@/app/path/[id]/api";
import OrderedGroup from "@/components/OrderedGroup";
import UnorderedGroup from "@/components/UnorderedGroup";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function UnorderNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: GroupData;
  type: string;
  isConnectable: boolean;
}) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <UnorderedGroup id={id} data={data} isScrollable={false} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(UnorderNode);
