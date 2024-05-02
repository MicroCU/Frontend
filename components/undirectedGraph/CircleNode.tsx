import { cn } from "@/lib/utils";
import { PathStatus } from "@/types/enum";
import { UndirectedGraphNodeData } from "@/types/type";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import React, { useRef, useEffect, useState } from "react";

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
  const descRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  console.log(width);
  useEffect(() => {
    if (descRef.current) {
      const elementWidth = descRef.current.offsetWidth;
      setWidth(elementWidth);
    }
  }, []);
  if (status === PathStatus.CURRENT_PREVIEW) {
    return (
      <div className="bg-primary w-12 h-12 rounded-full glow-selected-node" />
    );
  } else {
    return (
      <div className="relative">
        <div
          className={cn(
            "w-6 h-6 rounded-full bg-graySmall",
            status === PathStatus.STILL_LEARNING
              ? "bg-grayMedium animate-pulse"
              : "",
            status === PathStatus.PASSED_TEST ? "bg-progress" : ""
          )}
        />
        <div
          ref={descRef}
          className="absolute bottom-30 w-auto text-center text-xs line-clamp-2"
          style={{left: -width / 2 + 12}}
        >
          {name}
        </div>
      </div>
    );
  }
}

export default memo(CircleNode);
