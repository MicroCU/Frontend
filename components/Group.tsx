"use client";
import { GroupTypeEnum } from "@/types/enum";
import Micro, { IMicroProps } from "./Micro";
import { useEffect, useState } from "react";

export interface IGroupProps {
  title: string;
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ title, micros, type }: IGroupProps) {
  const [totalWidth, setTotalWidth] = useState(0);
  const [microWidth, setMicroWidth] = useState<Map<number, number>>(new Map());
  const handleWidth = (index: number, width: number) => {
    setMicroWidth((prev) => {
      prev.set(index, width);
      return prev;
    });
  };
  useEffect(() => {
    setTotalWidth(calculateTotalWidth(microWidth));
  }, [microWidth]);
  return (
    <>
      {type === GroupTypeEnum.Ordered ? (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center p-4 gap-y-4 rounded-2xl">
          <div className="max-w-52">
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}{" "}
            </p>
          </div>
          {micros.map((micro) => (
            <Micro
              id={micro.id}
              title={micro.title}
              progress={micro.progress}
              type={micro.type}
              status={micro.status}
              isGroup={micro.isGroup}
              key={micro.id}
              className="mx-auto"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center p-4 gap-y-4 rounded-2xl">
          <div style={{ maxWidth: totalWidth }}>
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}
            </p>
          </div>
          <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl">
            {micros.map((micro, index) => (
              <Micro
                id={micro.id}
                title={micro.title}
                progress={micro.progress}
                type={micro.type}
                status={micro.status}
                isGroup={micro.isGroup}
                key={micro.id}
                microIndex={index}
                handleWidthCalculation={handleWidth}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function calculateTotalWidth(totalWidth: Map<number, number>) {
  // TODO: Only first 3 and should plus padding
  let total = 0;
  totalWidth.forEach((width) => {
    total += width;
  });
  return total;
}
