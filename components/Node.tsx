import { PathStatus } from "@/types/enum";

export interface INodeProps {
  status: PathStatus;
}

export default function Node({ status }: INodeProps) {
  if (status === PathStatus.CURRENT_PREVIEW) {
    return (
      <div className="relative p-2">
        <div className="bg-primary w-12 h-12 rounded-full glow-selected-node"></div>
      </div>
    );
  } else {
    return (
      <div
        className={`w-6 h-6 rounded-full ${
          status === PathStatus.STILL_LEARNING
            ? "bg-progress"
            : status === PathStatus.PASSED_TEST
            ? "bg-grayMedium"
            : "bg-graySmall"
        }`}
      ></div>
    );
  }
}
