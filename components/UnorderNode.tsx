import { Group, GroupType } from "@/types/path";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import GroupScrollArea from "./GroupScrollArea";
import Micro from "./Micro";

function UnorderedGroup({
  id,
  data,
  isScrollable
}: {
  id: string;
  data: Group;
  isScrollable: boolean;
}) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pl-4 pr-4">
      <div className="pt-4 w-full">
        <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
          {data.name}
        </p>
      </div>
      <GroupScrollArea
        type={GroupType.Unordered}
        microLength={data.micros.length}
        isScrollable={isScrollable}
      >
        <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4">
          {data.micros.map((micro) => (
            <Micro data={micro} isGroup={true} key={micro.id} />
          ))}
        </div>
      </GroupScrollArea>
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
