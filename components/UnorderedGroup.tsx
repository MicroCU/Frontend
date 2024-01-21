import { GroupTypeEnum } from "@/types/enum";
import Micro from "./Micro";
import GroupScrollArea from "./GroupScrollArea";
import { IMicroData } from "@/types/type";

export interface IUnorderedGroupProps {
  id: string;
  title: string;
  micros: IMicroData[];
  maxMicroComponentWidth: number;
  isScrollable?: boolean;
}

export default function UnorderedGroup({
  id,
  title,
  micros,
  maxMicroComponentWidth,
  isScrollable
}: IUnorderedGroupProps) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pl-4 pr-4">
      <div className="pt-4 w-full" style={{ maxWidth: maxMicroComponentWidth }}>
        <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </p>
      </div>
      <GroupScrollArea
        type={GroupTypeEnum.Unordered}
        microLength={micros.length}
        isScrollable={isScrollable}
      >
        <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4">
          {micros.map((micro, index) => (
            <Micro data={micro} isGroup={true} key={micro.id} />
          ))}
        </div>
      </GroupScrollArea>
    </div>
  );
}
