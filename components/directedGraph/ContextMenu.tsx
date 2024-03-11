import { GroupDisplay } from "@/types/enum";
import React from "react";

export interface ContextMenuProps {
  id: string;
  type: string | undefined;
  top: number;
  left: number;
  right: number;
  bottom: number;
  onClick?: () => void;
}

export default function ContextMenu({
  id,
  type,
  top,
  left,
  right,
  bottom,
  onClick
}: ContextMenuProps) {
  return (
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
        right: `${right}px`,
        bottom: `${bottom}px`
      }}
      className="absolute z-[100] bg-grayMain hover:bg-grayMedium border-solid rounded shadow-md w-fit h-fit Medium16 text-white"
      onClick={onClick}
    >
      <button onClick={() => {}} className="p-2 text-left w-full">
        Marked as completed
      </button>
    </div>
  );
}
