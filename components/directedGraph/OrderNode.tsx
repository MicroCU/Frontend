import { Group } from "@/types/path";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import Micro from "../Micro";
import I18nTypo from "../ui/I18nTypo";

function OrderedGroup({ id, data }: { id: string; data: Group }) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
      <div className="pl-4 pr-4 w-fit uppercase Bold16 text-progress max-w-60">
        <I18nTypo className="break-words">{data.name}</I18nTypo>
      </div>
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
        className="opacity-0"
      />
      <OrderedGroup id={id} data={data} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        className="opacity-0"
      />
    </>
  );
}

export default memo(OrderNode);
