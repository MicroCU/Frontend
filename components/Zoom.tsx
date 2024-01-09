"use client";
import { Plus, Minus } from "lucide-react";

export interface IZoom {
  className?: string;
  onClickZoomIn: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onClickZoomOut: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
export default function Zoom({
  className,
  onClickZoomIn,
  onClickZoomOut
}: IZoom) {
  return (
    <div
      className={`flex flex-col gap-y-7 bg-grayLight stroke-grayMedium border-[1px] rounded-lg px-[13px] py-[17px] ${className}`}
    >
      <Plus
        strokeWidth={4}
        onClick={onClickZoomIn}
        className="cursor-pointer"
      />
      <Minus
        strokeWidth={4}
        onClick={onClickZoomOut}
        className="cursor-pointer"
      />
    </div>
  );
}
