import { MicroTypeEnum } from "@/types/enum";
import { IMicroData } from "@/types/type";

export interface IMicroProps {
  data: IMicroData;
  isGroup?: boolean;
  className?: string;
}

export default function Micro({
  data,
  isGroup = true,
  className
}: IMicroProps) {
  const type = data.type;
  const progress = data.progress;
  const { backgroundColor, textColor, borderRadius } = customStyle(
    type,
    progress,
    isGroup
  );

  return (
    <div
      className={`${className} ${
        type === MicroTypeEnum.TEST &&
        progress === 100 &&
        "border-3 p-4 rounded-2xl w-fit bg-progressLight"
      } ${
        type === MicroTypeEnum.TEST &&
        progress !== 100 &&
        "border-3 p-4 rounded-2xl w-fit bg-primaryLight"
      }`}
    >
      <div className="relative w-fit h-fit max-w-52">
        <div
          className={`${backgroundColor} w-full h-full px-5 py-3 text-center
            ${borderRadius} ${textColor} Bold16 flex items-center justify-center`}
        >
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {data.name}
          </div>
        </div>
        {progress > 0 && progress <= 100 && type === MicroTypeEnum.VIDEO && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            style={{ width: progress + "%" }}
          ></div>
        )}
      </div>
    </div>
  );
}

function customStyle(type: MicroTypeEnum, progress: number, isGroup: boolean) {
  let backgroundColor = "";
  let textColor = "text-white";
  if (type === MicroTypeEnum.VIDEO) {
    textColor = "text-grayMain";
    if (isGroup) {
      backgroundColor = "bg-grayLight";
    } else {
      backgroundColor = "bg-white";
    }
  } else if (type === MicroTypeEnum.PRACTICE || type === MicroTypeEnum.TEST) {
    if (progress > 0) {
      backgroundColor = "bg-progress";
    } else {
      backgroundColor = "bg-primary";
    }
  }

  let borderRadius = "rounded-lg";
  if (progress > 0 && type === MicroTypeEnum.VIDEO) {
    borderRadius = "rounded-t-lg";
  }

  return {
    backgroundColor,
    textColor,
    borderRadius
  };
}
