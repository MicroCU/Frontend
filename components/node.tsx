export enum NodeStatusEnum {
  CURRENT_PREVIEW = 1,
  STILL_LEARNING = 2,
  PASSED_TEST = 3,
  NOT_VISITED = 4
}

export interface INodeProps {
  status: NodeStatusEnum;
}

export default function Node({ status }: INodeProps) {
  if (status === NodeStatusEnum.CURRENT_PREVIEW) {
    return (
      <div className="relative p-2">
        <div className="bg-primary w-12 h-12 rounded-full glow-selected-node"></div>
        {/* <div className="absolute -inset-1 rounded-full blur-md bg-primary z-10"></div> */}
      </div>
    );
  } else {
    return (
      <div
        className={`w-6 h-6 rounded-full ${
          status === NodeStatusEnum.STILL_LEARNING
            ? "bg-progress"
            : status === NodeStatusEnum.PASSED_TEST
            ? "bg-grayMedium"
            : "bg-graySmall"
        }`}
      ></div>
    );
  }
}
