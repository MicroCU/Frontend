import { Group } from "@/types/path";
import { memo, useRef } from "react";
import { Handle, Position } from "reactflow";
import Micro from "./Micro";
import OverflowTooltip from "./OverflowTooltip";
import { useOverflowDetection } from "@/hooks/Overflow";

function OrderedGroup({ id, data }: { id: string; data: Group }) {
  const containerOverflowRef = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflowDetection(containerOverflowRef, data.name);
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
      <OverflowTooltip text={data.name} isOverflowing={isOverflow}>
        <div className="pl-4 pr-4 w-fit uppercase Bold16 text-progress max-w-60">
          <p
            className="overflow-hidden whitespace-nowrap overflow-ellipsis"
            ref={containerOverflowRef}
          >
            {data.name}
          </p>
        </div>
      </OverflowTooltip>
      <div className="flex flex-col w-full h-fit justify-center items-center gap-y-4 pl-4 pr-4">
        {data.micros.map((micro) => (
          <Micro data={micro} isGroup={true} key={micro.id} />
        ))}
      </div>
    </div>
  );
}

function OrderNode({
  id,
  data,
  isConnectable
}: {
  id: string;
  data: Group;
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
      <OrderedGroup id={id} data={data} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(OrderNode);
