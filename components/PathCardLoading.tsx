import { Skeleton } from "./ui/skeleton";
import { Text } from "lucide-react";

interface PathCardLoadingProps {
  count: number;
}

export default function PathCardLoading({ count }: PathCardLoadingProps) {
  const loadingItems = Array.from({ length: count });
  return (
    <>
      {loadingItems.map((_, index) => (
        <div
          className="flex flex-row justify-between items-center w-full my-3"
          key={index}
        >
          <div className="flex flex-col gap-y-2 w-10/12">
            <Skeleton className="w-3/6 h-[16px] rounded" />
            <Skeleton className="w-4/6 h-[48px] rounded" />
            <div className="flex flex-row gap-x-2">
              <Skeleton className="w-1/4 h-[16px] rounded" />
              <Skeleton className="w-1/4 h-[16px] rounded" />
            </div>
          </div>
          <Skeleton className="w-[200px] h-[120px]">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <div className="bg-grayMedium w-fit h-fit rounded p-[2px]">
                <Text strokeWidth={3} className="stroke-graySmall" />
              </div>
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
}
