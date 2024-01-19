"use client";
import { GroupTypeEnum } from "@/types/enum";
import { IMicroProps } from "./Micro";
import { useEffect, useRef, useState } from "react";
import UnorderedGroup from "./UnorderedGroup";
import OrderedGroup from "./OrderedGroup";

export interface IGroupProps {
  id: string;
  title: string;
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ id, title, micros, type }: IGroupProps) {
  const [microComponentWidth, setMicroComponentWidth] = useState(0);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getWidth = () => {
      if (groupRef.current) {
        const width = groupRef.current.getBoundingClientRect().width;
        setMicroComponentWidth(width);
      }
    };

    getWidth();
    window.addEventListener("resize", getWidth);

    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [id]);

  return (
    <div ref={groupRef}>
      {type === GroupTypeEnum.Ordered ? (
        <OrderedGroup
          id={id}
          title={title}
          micros={micros}
          maxMicroComponentWidth={microComponentWidth}
        />
      ) : (
        <UnorderedGroup
          id={id}
          title={title}
          micros={micros}
          maxMicroComponentWidth={microComponentWidth}
        />
      )}
    </div>
  );
}
