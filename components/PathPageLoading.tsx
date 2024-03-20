import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
const Lottie = dynamic(() => import("@/components/Lottie"), { ssr: false });

export default function PathPageLoading() {
  return (
    <div className="h-screen">
      <div className="w-screen h-2/6 flex flex-col gap-y-4 pt-[60px] pb-12 px-20 effect-default">
        <Skeleton className="w-1/12 h-10 bg-grayLight" />
        <div className="flex flex-row gap-x-8 items-center">
          <div className="flex flex-col gap-y-4 w-1/4">
            <Skeleton className="w-full h-10 bg-grayLight" />
            <div className="flex flex-row flex-wrap gap-3">
              <Skeleton className="w-1/3 h-8 bg-grayLight" />
              <Skeleton className="w-1/3 h-8 bg-grayLight" />
            </div>
          </div>
          <Skeleton className="w-3/4 h-28 bg-grayLight" />
        </div>
      </div>
      <div className="w-screen h-4/6 flex justify-center items-center">
        <Lottie src="/lottie/graph.json" />
      </div>
    </div>
  );
}
