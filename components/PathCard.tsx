import Tag from "./Tag";
import { Text } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BriefPathInfo } from "@/types/type";

export enum PathCardType {
  "Loading" = "loading",
  "Shown" = "shown"
}

export interface PathCardProps {
  path: BriefPathInfo;
  type: PathCardType;
}

export default function PathCard({ path, type }: PathCardProps) {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-col gap-y-2 w-10/12">
        {type === PathCardType.Loading ? (
          <>
            <Skeleton className="w-3/6 h-[16px] bg-grayLight rounded" />
            <Skeleton className="w-4/6 h-[48px] bg-graySmall rounded" />
            <div className="flex flex-row gap-x-2">
              <Skeleton className="w-1/4 h-[16px] bg-grayLight rounded" />
              <Skeleton className="w-1/4 h-[16px] bg-grayLight rounded" />
            </div>
          </>
        ) : (
          <>
            <p className="Bold16 text-black"> {path.name} </p>
            <p className="Reg12 text-grayMain line-clamp-2">
              {path.description}
            </p>
            <div className="flex flex-row gap-x-2">
              {path.tags?.map((category) => (
                <Tag
                  title={category.name}
                  imageURL={category.icon}
                  key={category.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {type === PathCardType.Loading ? (
        <Skeleton className="w-[200px] h-[120px] bg-graySmall">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="bg-grayMedium w-fit h-fit rounded p-[2px]">
              <Text strokeWidth={3} className="stroke-graySmall" />
            </div>
          </div>
        </Skeleton>
      ) : (
        <div className="flex flex-col justify-center items-center w-[200px] h-[120px] bg-graySmall">
          <div className="bg-grayMedium w-fit h-fit rounded p-[2px]">
            <Text strokeWidth={3} className="stroke-graySmall" />
          </div>
        </div>
      )}
    </div>
  );
}
