import { Handle, NodeProps, Position } from "reactflow";

export default function CustomNode(props: NodeProps) {
  let calSize = props.data.mass;
  calSize = calSize * 5 + 70;

  const size = `${calSize}px`; // assumes mass represents pixel size

  return (
    <div
      className="bg-slate-500 rounded-full flex items-center justify-center text-white"
      style={{ width: size, height: size }}
    >
      <Handle className="opacity-0" type="source" position={Position.Top} />
      <Handle className="opacity-0" type="target" position={Position.Bottom} />
      <div className="text-center">{props.data.label}</div>
    </div>
  );
}
