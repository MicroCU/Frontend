import { RefObject, useEffect, useState } from "react";

export const useOverflowDetection = (
  ref: RefObject<HTMLDivElement>,
  title: string,
  maxMicroComponentWidth?: number
) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const container = ref.current;

    if (container) {
      const isOverflowing = container.scrollWidth > container.clientWidth;
      setIsOverflow(isOverflowing);
    }
  }, [title, maxMicroComponentWidth, ref]);

  return isOverflow;
};

export const useOverflowDetectionWithMicrosWidth = (
  microsRef: RefObject<HTMLDivElement>,
  titleRef: RefObject<HTMLDivElement>
) => {
  const [microsWidth, setMicrosWidth] = useState(0);
  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    const microsW = microsRef.current;
    const titleW = titleRef.current;

    if (microsW && titleW) {
      const isOverflowing = titleW.scrollWidth > microsW.clientWidth;
      setMicrosWidth(microsW.clientWidth);
      setIsOverflow(isOverflowing);
    }
  }, [microsRef, titleRef]);

  return { microsWidth, isOverflow };
};
