import { Skeleton } from "./ui/skeleton";

export default function JourneyItemsLoading() {
  return (
    <>
      <Skeleton className="h-8 w-full bg-grayLight" />
      <Skeleton className="h-8 w-full bg-graySmall" />
      <Skeleton className="h-8 w-full bg-grayLight" />
      <Skeleton className="h-8 w-full bg-graySmall" />
      <Skeleton className="h-8 w-full bg-grayLight" />
    </>
  );
}
