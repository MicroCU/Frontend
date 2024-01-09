import { cn } from "@/lib/utils";

type LinearProgressBarProps = {
  currSteps: number;
  maxSteps: number;
};

const LinearProgressBar = ({ currSteps, maxSteps }: LinearProgressBarProps) => {
  return (
    <ul className="relative flex flex-row w-full">
      {Array(maxSteps)
        .fill(0)
        .map((_, index) => {
          return (
            <Stepper key={index} currSteps={currSteps} placement={index} />
          );
        })}
    </ul>
  );
};
export default LinearProgressBar;

type StepperProps = {
  placement: number;
  currSteps: number;
};

const Stepper = ({ currSteps, placement }: StepperProps) => {
  return (
    <li className="shrink basis-0 flex-1 group ">
      <div className="w-full inline-flex items-center align-middle">
        <span
          className={cn(
            "w-8 h-8 flex justify-center items-center flex-shrink-0 rounded-full bg-graySmall",
            placement > currSteps - 1 ? "" : "bg-primary"
          )}
        ></span>
        <div
          className={cn(
            "w-full h-2 flex-1 bg-graySmall group-last:hidden",
            placement >= currSteps - 1 ? "" : "bg-primary"
          )}
        />
      </div>
    </li>
  );
};
