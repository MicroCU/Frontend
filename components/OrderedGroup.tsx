import Micro, { IMicroProps } from "./Micro";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface IOrderedGroupProps {
  id: string;
  title: string;
  micros: IMicroProps[];
  maxMicroComponentWidth: number;
}

export default function OrderedGroup({
  id,
  title,
  micros,
  maxMicroComponentWidth
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
      <ScrollArea
        className={`w-fit ${micros.length >= 3 ? "h-44" : "h-28"} border-none`}
      >
        <div className="flex flex-col w-fit h-fit justify-center content-center gap-y-4 pl-4 pr-4">
          {micros.map((micro, index) => (
            <Micro
              id={micro.id}
              title={micro.title}
              progress={micro.progress}
              type={micro.type}
              isGroup={micro.isGroup}
              key={micro.id}
              className="mx-auto"
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}

// Remove Line 27-29, 43-44 If you don't want to use scroll
