import { OnBoardModalContainer } from "./OnBoardModal";
import { Skeleton } from "../ui/skeleton";

const OnboardLoading = () => {
  return (
    <OnBoardModalContainer>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-[24px] w-[40%]" />
          <Skeleton className="h-[32px] w-[60%]" />
        </div>
        <Skeleton className="h-[200px]" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-[32px] w-1/5" />
        <Skeleton className="h-[32px] w-1/5" />
      </div>
    </OnBoardModalContainer>
  );
};

export default OnboardLoading;
