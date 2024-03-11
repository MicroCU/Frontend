import React from "react";

export interface ContextMenuProps {
  id: string;
  top: number;
  left: number;
  right: number;
  bottom: number;
  onClick?: () => void;
}

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  onClick
}: ContextMenuProps) {
  console.log("ContextMenuProps: ", id, top, left, right, bottom);
  return (
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
        right: `${right}px`,
        bottom: `${bottom}px`
      }}
      className="absolute z-[100]"
      onClick={onClick}
    >
      <p style={{ margin: "0.5em" }}>
        <small>node: {id}</small>
      </p>
    </div>
  );
}
