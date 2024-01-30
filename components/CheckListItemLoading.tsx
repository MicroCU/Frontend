import { Skeleton } from "./ui/skeleton";

export default function CheckListItemLoading() {
  const loadingItems = Array.from({ length: 3 });
  return loadingItems.map((_, index) => (
    <div key={index}>
      <div className="max-w-[250px] flex flex-row grow gap-6 justify-center items-center">
        <div className="w-2/5">
          <Skeleton className="h-[70px] w-[70px] rounded-full bg-grayLight" />
        </div>
        <div className="flex flex-col gap-y-2 grow justify-center items-center w-3/5">
          <Skeleton className="h-4 w-full bg-grayLight" />
          <Skeleton className="h-[41px] w-full bg-graySmall" />
        </div>
      </div>
    </div>
  ));
}
