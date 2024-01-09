export enum MicroTypeEnum {
  VIDEO = 1,
  PRACTICE = 2,
  TEST = 3
}

export enum MicroStatusEnum {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3
}

export interface IMicroProps {
  id: string;
  title: string;
  progress: number; // 0 - 100
  type: MicroTypeEnum;
  status: MicroStatusEnum;
  isGroup?: boolean;
}

export default function Micro({
  title,
  progress,
  type,
  status,
  isGroup = true
}: IMicroProps) {
  let backgroundColor = "";
  let textColor = "text-white";
  if (type === MicroTypeEnum.VIDEO) {
    textColor = "text-black";
    if (isGroup) {
      backgroundColor = "bg-grayLight";
    } else {
      backgroundColor = "bg-white";
    }
  } else if (type === MicroTypeEnum.PRACTICE) {
    if (
      status === MicroStatusEnum.COMPLETED ||
      status === MicroStatusEnum.IN_PROGRESS
    ) {
      backgroundColor = "bg-progress";
    } else {
      backgroundColor = "bg-primary";
    }
  } else if (type === MicroTypeEnum.TEST) {
    if (
      status === MicroStatusEnum.COMPLETED ||
      status === MicroStatusEnum.IN_PROGRESS
    ) {
      backgroundColor = "bg-progress";
    } else {
      backgroundColor = "bg-primary";
    }
  }

  let borderRadius = "rounded-lg";
  const widthNode = 115;
  if (progress > 0 && type === MicroTypeEnum.VIDEO) {
    borderRadius = "rounded-t-lg";
  }

  let parentStyle = "";
  if (type === MicroTypeEnum.TEST) {
    if (status === MicroStatusEnum.COMPLETED) {
      parentStyle =
        "flex items-center justify-center w-[147px] h-[75px] rounded-2xl bg-progressLight";
    } else {
      parentStyle =
        "flex items-center justify-center w-[147px] h-[75px] rounded-2xl bg-primaryLight";
    }
  }

  return (
    <div className={`${parentStyle}`}>
      <div className="relative w-[115px] h-[43px]">
        <div
          className={`${backgroundColor} w-full h-full px-5 py-3 text-center
            ${borderRadius} ${textColor} Bold16 flex items-center justify-center`}
        >
          <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {title}
          </div>
        </div>
        {progress > 0 && progress <= 100 && type === MicroTypeEnum.VIDEO && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            style={{ width: (progress / 100) * widthNode }}
          ></div>
        )}
      </div>
    </div>
  );
}
