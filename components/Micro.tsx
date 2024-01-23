import { MicroData } from "@/app/path/[id]/api";
import { MicroTypeEnum } from "@/types/enum";

export default function Micro({
  data,
  isGroup
}: {
  data: MicroData;
  isGroup: boolean;
}) {
  const { backgroundColor, textColor, borderRadius } = customStyle(
    data.type,
    data.progress,
    isGroup
  );

  return (
    <div
      className={`${
        data.type === MicroTypeEnum.TEST &&
        data.progress === 100 &&
        "border-3 p-4 rounded-2xl w-fit bg-progressLight"
      } ${
        data.type === MicroTypeEnum.TEST &&
        data.progress !== 100 &&
        "border-3 p-4 rounded-2xl w-fit bg-primaryLight"
      }`}
    >
      <div className="relative w-fit h-fit max-w-52">
        <div
          className={`${backgroundColor} w-full h-full px-5 py-3 text-center
            ${borderRadius} ${textColor} Bold16 flex items-center justify-center`}
        >
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {data.title}
          </div>
        </div>
        {data.progress > 0 &&
          data.progress <= 100 &&
          data.type === MicroTypeEnum.VIDEO && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-primary"
              style={{ width: data.progress + "%" }}
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
