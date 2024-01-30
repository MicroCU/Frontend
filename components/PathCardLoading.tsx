import { Skeleton } from "./ui/skeleton";

export default function PathCardLoading() {
  return (
    <>
      <Skeleton className="w-3/6 h-[16px] bg-grayLight rounded" />
      <Skeleton className="w-4/6 h-[48px] bg-graySmall rounded" />
      <div className="flex flex-row gap-x-2">
        <Skeleton className="w-1/4 h-[16px] bg-grayLight rounded" />
        <Skeleton className="w-1/4 h-[16px] bg-grayLight rounded" />
      </div>
    </>
  );
}
