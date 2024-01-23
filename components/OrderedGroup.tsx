import { GroupData, MicroData } from "@/app/path/[id]/api";
import { GroupTypeEnum } from "@/types/enum";
import GroupScrollArea from "./GroupScrollArea";
import Micro from "./Micro";

export default function OrderedGroup({
  id,
  data,
  isScrollable
}: {
  id: string;
  data: GroupData;
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
        type={GroupTypeEnum.Ordered}
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
