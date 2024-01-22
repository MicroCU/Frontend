import {
  groupSettings,
  orderedGroupHighWithTwoMember,
  unOrderedGroupHigh
} from "@/app/path/[id]/setting";
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
      className="nodrag nowheel relative flex flex-row justify-center content-center"
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
              ? groupSettings.maxHeight / 2 - unOrderedGroupHigh / 2
              : groupType === GroupTypeEnum.Ordered && memberLength == 2
              ? groupSettings.maxHeight / 2 - orderedGroupHighWithTwoMember / 2
              : 0
        }}
      >
        {children}
      </div>
    </div>
  );
}
