import { RefObject, useEffect, useState } from "react";

export const useOverflowDetection = (
  ref: RefObject<HTMLDivElement>,
  title: string,
  maxMicroComponentWidth: number
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
