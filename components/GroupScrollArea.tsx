import { GroupType } from "@/types/path";
import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function GroupScrollArea({
  children,
  type,
  microLength,
  isScrollable = true
}: {
  children: ReactNode;
  type: GroupType;
  microLength: number;
  isScrollable?: boolean;
}) {
  if (!isScrollable) return <>{children}</>;
  return (
    <>
      {type === GroupType.Ordered ? (
        <ScrollArea
          className={`w-fit ${microLength >= 3 ? "h-44" : "h-28"} border-none`}
        >
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <ScrollArea className="max-w-[656px] h-fit border-none">
          {children} <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </>
  );
}
