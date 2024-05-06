import { cn } from "@/lib/utils";
import { MicroType } from "@/types/enum";
import { Micro } from "@/types/path";
import MicroContextMenu from "./MicroContextMenu";
import I18nTypo from "./ui/I18nTypo";

interface MicroPracticeProps {
  data: Micro;
  className?: string;
}

export default function MicroPractice({ data, className }: MicroPracticeProps) {
  return (
    <MicroContextMenu microType={MicroType.Practice} id={data.id}>
      <div
        className={cn(
          data.progress > 0 ? "bg-progress" : "bg-primary",
          "relative w-fit h-fit rounded-lg px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52",
          className
        )}
      >
        <p className="break-words">
          <I18nTypo>{data.name}</I18nTypo>
        </p>
      </div>
    </MicroContextMenu>
  );
}
