import { defaultSettings, groupSettings } from "@/app/path/[id]/setting";
import { GroupTypeEnum } from "@/types/enum";
import { ReactNode } from "react";

export default function DegreWrapperGroup({
  children,
  groupType,
  memberLength
}: {
  children: ReactNode;
  groupType: GroupTypeEnum;
  memberLength: number;
}) {
  return (
    <div
      className="relative flex flex-row justify-center content-center"
      style={{
        width: groupSettings.maxWidth,
        height: groupSettings.maxHeight
      }}
    >
      <div
        className="absolute w-fit h-fit"
        style={{
          top:
            groupType === GroupTypeEnum.Unordered
              ? groupSettings.maxHeight / 2 -
                2 * defaultSettings.Padding -
                defaultSettings.groupTitleHigh
              : groupType === GroupTypeEnum.Ordered && memberLength == 2
              ? defaultSettings.singleHeight / 2 +
                defaultSettings.groupTitleHigh / 2
              : 0
        }}
      >
        {children}
      </div>
    </div>
  );
}
