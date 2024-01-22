import { groupSettings, defaultSettings } from "@/app/path/[id]/setting";
import { ReactNode } from "react";

export default function DegreWrapperSingle({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="relative flex flex-row justify-center content-center border"
      style={{
        width: groupSettings.maxWidth,
        height: groupSettings.maxHeight
      }}
    >
      <div
        className="absolute w-fit h-fit"
        style={{
          top: groupSettings.maxHeight / 2 - defaultSettings.singleHeight / 2
        }}
      >
        {children}
      </div>
    </div>
  );
}
