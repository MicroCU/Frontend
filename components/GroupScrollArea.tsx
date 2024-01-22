import { GroupTypeEnum } from "@/types/enum";
import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function GroupScrollArea({
  children,
  type,
  microLength,
  isScrollable = true
}: {
  children: ReactNode;
  type: GroupTypeEnum;
  microLength: number;
  isScrollable?: boolean;
}) {
  if (!isScrollable) return <>{children}</>;
  return (
    <>
      {type === GroupTypeEnum.Ordered ? (
        <ScrollArea
          className={`w-full ${
            microLength > 3 ? "h-[152px]" : "h-fit"
          } border-none`}
        >
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <ScrollArea
          className={`${
            microLength > 3 ? "max-w-[600px]" : "max-w-[656px]"
          } h-fit border-none`}
        >
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </>
  );
}
