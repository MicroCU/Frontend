import { memo, useCallback } from "react";
import {
  EdgeProps,
  Handle,
  NodeProps,
  Position,
  getStraightPath,
  useStore
} from "reactflow";

function UnselectPath(props: NodeProps) {
  return (
    <div className="bg-progress rounded-full flex items-center justify-center text-white w-16 h-16">
      <Handle className="opacity-0" type="source" position={Position.Top} />
      <Handle className="opacity-0" type="target" position={Position.Bottom} />
      <div className="text-center">{props.data.name}</div>
    </div>
  );
}

export default memo(UnselectPath);
