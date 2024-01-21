import { GroupTypeEnum } from "@/types/enum";
import GroupScrollArea from "./GroupScrollArea";
import Micro from "./Micro";
import { IMicroData } from "@/types/type";

export interface IOrderedGroupProps {
  id: string;
  title: string;
  micros: IMicroData[];
  maxMicroComponentWidth: number;
  isScrollable?: boolean;
}

export default function OrderedGroup({
  id,
  title,
  micros,
  maxMicroComponentWidth,
  isScrollable
}: IOrderedGroupProps) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pt-4 pb-4">
      <div
        className="pl-4 pr-4 w-fit"
        style={{ maxWidth: maxMicroComponentWidth }}
      >
        <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </p>
      </div>
      <GroupScrollArea
        type={GroupTypeEnum.Ordered}
        microLength={micros.length}
        isScrollable={isScrollable}
      >
        <div className="flex flex-col w-fit h-fit justify-center content-center gap-y-4 pl-4 pr-4">
          {micros.map((micro, index) => (
            <Micro
              data={micro}
              isGroup={true}
              key={micro.id}
              className="mx-auto"
            />
          ))}
        </div>
      </GroupScrollArea>
    </div>
  );
}
