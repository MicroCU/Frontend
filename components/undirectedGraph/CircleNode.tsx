import { cn } from "@/lib/utils";
import { PathStatus } from "@/types/enum";
import { UndirectedGraphNodeData } from "@/types/type";
import { memo } from "react";
import { Handle, Position } from "reactflow";

function CircleNode({
  id,
  data,
  type
}: {
  id: string;
  data: UndirectedGraphNodeData;
  type: string;
}) {
  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Node status={data.status} name={data.pathInfo.name} />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </>
  );
}

export interface NodeProps {
  status: PathStatus;
  name: string;
}

export function Node({ status, name }: NodeProps) {
  if (status === PathStatus.CURRENT_PREVIEW) {
    return (
      <div className="bg-primary w-12 h-12 rounded-full glow-selected-node"></div>
    );
  } else {
    return (
      <div className="relative">
        <div
          className={cn(
            "w-6 h-6 rounded-full",
            status === PathStatus.STILL_LEARNING
              ? "bg-progress"
              : status === PathStatus.PASSED_TEST
              ? "bg-grayMedium"
              : "bg-graySmall"
          )}
        ></div>
        <div className="absolute flex flex-col justify-center items-center w-5">
          <div className="text-center">{name}</div>
        </div>
      </div>
    );
  }
}

export default memo(CircleNode);
