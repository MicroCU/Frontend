import { Group } from "@/types/path";
import { memo, useRef } from "react";
import { Handle, Position } from "reactflow";
import Micro from "./Micro";
import { useOverflowDetectionWithMicrosWidth } from "@/hooks/Overflow";

function UnorderedGroup({ id, data }: { id: string; data: Group }) {
  const titleWidthRef = useRef<HTMLDivElement>(null);
  const microsWidthRef = useRef<HTMLDivElement>(null);
  const { microsWidth } = useOverflowDetectionWithMicrosWidth(
    microsWidthRef,
    titleWidthRef
  );
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl p-4">
      <div
        className="pl-4 pr-4 w-fit uppercase Bold16 text-progress"
        style={{ maxWidth: microsWidth + "px" }}
      >
        <div className="break-words" ref={titleWidthRef}>
          {data.name}
        </div>
      </div>
      <div
        className="flex flex-row bg-white w-fit h-fit justify-center items-center gap-x-4 rounded-2xl"
        ref={microsWidthRef}
      >
        {data.micros.map((micro) => (
          <Micro data={micro} isGroup={true} key={micro.id} />
        ))}
      </div>
    </div>
  );
}

function UnorderNode({
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
      <UnorderedGroup id={id} data={data} />
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
