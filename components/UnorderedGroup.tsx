import Micro, { IMicroProps } from "./Micro";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface IUnorderedGroupProps {
  id: string;
  title: string;
  micros: IMicroProps[];
  maxMicroComponentWidth: number;
}

export default function UnorderedGroup({
  id,
  title,
  micros,
  maxMicroComponentWidth
}: IUnorderedGroupProps) {
  return (
    <div className="flex flex-col bg-white w-fit h-fit justify-center content-center gap-y-4 rounded-2xl pl-4 pr-4">
      <div className="pt-4 w-full" style={{ maxWidth: maxMicroComponentWidth }}>
        <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title}
        </p>
      </div>
      <ScrollArea className="max-w-[656px] h-fit border-none">
        <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl pb-4">
          {micros.map((micro, index) => (
            <Micro
              id={micro.id}
              title={micro.title}
              progress={micro.progress}
              type={micro.type}
              isGroup={micro.isGroup}
              key={micro.id}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

// Remove Line 24, 37-38 If you don't want to use scroll
