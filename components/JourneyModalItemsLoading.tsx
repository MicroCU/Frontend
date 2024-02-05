import PathCardLoading from "./PathCardLoading";
import { Skeleton } from "./ui/skeleton";

export default function JourneyModalItemsLoading() {
  const loadingItems = Array.from({ length: 2 });
  return (
    <div className="flex flex-col space-y-6">
      {loadingItems.map((_, index) => (
        <div key={index}>
          <Skeleton className="w-3/6 h-[32px] bg-grayLight rounded mb-4" />
          <div className="flex flex-row w-full h-full">
            <Skeleton className="w-[16px] flex-x-1 bg-grayLight rounded" />
            <div className="flex flex-col flex-1 gap-y-4 pl-6 border-graySmall">
              {loadingItems.map((_, index) => (
                <PathCardLoading key={index} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
