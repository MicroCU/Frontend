import PathCardLoading from "./PathCardLoading";
import { Skeleton } from "./ui/skeleton";

export default function JourneyModalItemsLoading() {
  const loadingItems = Array.from({ length: 2 });
  return (
    <div className="flex flex-col space-y-6">
      {loadingItems.map((_, index) => (
        <div key={index}>
          <Skeleton className="w-3/6 h-[32px] rounded mb-4" />
          <div className="flex flex-row w-full h-full">
            <Skeleton className="w-[16px] flex-x-1 rounded" />
            <div className="flex flex-col flex-1 pl-6 border-graySmall">
              <PathCardLoading key={index} count={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
