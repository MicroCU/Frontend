import { Group } from "@/types/path";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import GroupScrollArea from "./GroupScrollArea";
import Micro from "./Micro";
import { GroupDisplay } from "@/types/enum";

function OrderedGroup({
  id,
  data,
  isScrollable
}: {
  id: string;
  data: Group;
  isScrollable: boolean;
}) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
      <div className="pl-4 pr-4 w-fit">
        <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
          {data.name}
        </p>
      </div>
      <GroupScrollArea
        type={GroupDisplay.Ordered}
        microLength={data.micros.length}
        isScrollable={isScrollable}
      >
        <div className="flex flex-col w-fit h-fit justify-center content-center gap-y-4 pl-4 pr-4">
          {data.micros.map((micro) => (
            <Micro data={micro} isGroup={true} key={micro.id} />
          ))}
        </div>
      </GroupScrollArea>
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
      <OrderedGroup id={id} data={data} isScrollable={false} />
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
