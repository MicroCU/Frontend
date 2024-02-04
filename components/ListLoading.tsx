import { Skeleton } from "./ui/skeleton";

export default function ListItemsLoading() {
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
