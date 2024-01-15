"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MicroTypeEnum, MicroStatusEnum } from "@/types/enum";

export interface IMicroProps {
  id: string;
  title: string;
  progress: number; // 0 - 100
  type: MicroTypeEnum;
  status: MicroStatusEnum;
  isGroup?: boolean;
  className?: string;
}

export default function Micro({
  title,
  progress,
  type,
  status,
  isGroup = true,
  className
}: IMicroProps) {
  const [widthNode, setWidthNode] = useState(0);
  const [heightNode, setHeightNode] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getWidthAndHeight = () => {
      if (componentRef.current) {
        const { width, height } = componentRef.current.getBoundingClientRect();
        return { width, height };
      }
      return { width: 0, height: 0 };
    };

    const { width, height } = getWidthAndHeight();
    setWidthNode(width);
    setHeightNode(height);

    window.addEventListener("resize", getWidthAndHeight);

    return () => {
      window.removeEventListener("resize", getWidthAndHeight);
    };
  }, []);

  let backgroundColor = "";
  let textColor = "text-white";
  if (type === MicroTypeEnum.VIDEO) {
    textColor = "text-grayMain";
    if (isGroup) {
      backgroundColor = "bg-grayLight";
    } else {
      backgroundColor = "bg-white";
    }
  } else if (type === MicroTypeEnum.PRACTICE) {
    if (
      status === MicroStatusEnum.COMPLETED ||
      status === MicroStatusEnum.IN_PROGRESS
    ) {
      backgroundColor = "bg-progress";
    } else {
      backgroundColor = "bg-primary";
    }
  } else if (type === MicroTypeEnum.TEST) {
    if (
      status === MicroStatusEnum.COMPLETED ||
      status === MicroStatusEnum.IN_PROGRESS
    ) {
      backgroundColor = "bg-progress";
    } else {
      backgroundColor = "bg-primary";
    }
  }

  let borderRadius = "rounded-lg";
  if (progress > 0 && type === MicroTypeEnum.VIDEO) {
    borderRadius = "rounded-t-lg";
  }

  let parentStyle = "";
  if (type === MicroTypeEnum.TEST) {
    if (status === MicroStatusEnum.COMPLETED) {
      parentStyle =
        "flex items-center justify-center content-center rounded-2xl bg-progressLight";
    } else {
      parentStyle =
        "flex items-center justify-center content-center rounded-2xl bg-primaryLight";
    }
  }

  return (
    <div
      className={`${parentStyle} ${className}`}
      style={{
        width: type === MicroTypeEnum.TEST ? widthNode + 32 : widthNode,
        height: type === MicroTypeEnum.TEST ? heightNode + 32 : heightNode
      }}
    >
      <div ref={componentRef} className="relative w-fit h-fit max-w-52">
        <div
          className={`${backgroundColor} w-full h-full px-5 py-3 text-center
            ${borderRadius} ${textColor} Bold16 flex items-center justify-center`}
        >
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {title}
          </div>
        </div>
        {progress > 0 && progress <= 100 && type === MicroTypeEnum.VIDEO && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            style={{ width: (progress / 100) * widthNode }}
          ></div>
        )}
      </div>
    </div>
  );
}
