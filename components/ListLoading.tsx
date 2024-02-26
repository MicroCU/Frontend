import { Skeleton } from "./ui/skeleton";

export default function ListItemsLoading() {
  return (
    <>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </>
  );
}
