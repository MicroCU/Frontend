import { CheckCircle } from "lucide-react";
import LinearProgressBar from "./LinearProgressBar";
import OnBoardBtn from "./OnBoardBtn";
import { Button } from "./ui/button";
import Radio from "./Radio";
import Checkbox from "./CheckBox";

type OnBoardModalProps =
  | {
      variant: "welcome" | "finish";
      onClick: () => void;
    }
  | {
      variant: "radio" | "checkbox";
      step: number;
      title: string;
      choices: string[];
      onClick: () => void;
    };

const OnBoardModal = (props: OnBoardModalProps) => {
  if (props.variant === "welcome") {
    return (
      <OnBoardModalContainer>
        <div>
          <h1 className="text-grayMedium Bold24">Welcome,</h1>
          <h1 className="text-grayMain Bold32">
            Are there any courses you'd like to take?
          </h1>
        </div>
        <div className="space-y-6 ">
          <OnBoardBtn text="Sure! can’t wait anymore" onClick={props.onClick} />
          <h1 className="text-grayMedium Bold24 text-center">Or</h1>
          <OnBoardBtn
            text="Nah, I don’t have anything in my mind."
            onClick={props.onClick}
          />
        </div>
      </OnBoardModalContainer>
    );
  }
  if (props.variant === "finish") {
    return (
      <OnBoardModalContainer>
        <LinearProgressBar currSteps={2} maxSteps={5} />
        <div className="space-y-8 flex flex-col items-center p-[40px] ">
          <CheckCircle className="text-success w-20 h-20" />
          <div className="space-y-4">
            <h1 className="Bold32 text-grayMain text-center">All Set!</h1>
            <h1 className="Bold16 text-grayMedium text-center">
              Enjoy your Learning
            </h1>
          </div>
          <Button className="w-fit" onClick={props.onClick}>
            Go to Path
          </Button>
        </div>
      </OnBoardModalContainer>
    );
  }
  if (props.variant === "radio") {
    return (
      <OnBoardModalContainer>
        <LinearProgressBar currSteps={2} maxSteps={5} />
        <h1 className="text-grayMain Bold32">{props.title}</h1>
        <div className="space-y-6">
          <Radio title="radio" checked onClick={() => {}} name={props.title} />
          <Radio title="radio" checked onClick={() => {}} name={props.title} />
        </div>
        <Button
          className="w-fit self-end Bold16 text-grayMain"
          variant="ghost"
          onClick={props.onClick}
        >
          Skip
        </Button>
      </OnBoardModalContainer>
    );
  }
  if (props.variant === "checkbox") {
    return (
      <OnBoardModalContainer>
        <LinearProgressBar currSteps={2} maxSteps={5} />
        <h1 className="text-grayMain Bold32">{props.title}</h1>
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <Checkbox title="Programming" checked onClick={() => {}} />
          <Checkbox title="Programming" onClick={() => {}} />
          <Checkbox title="Programming" onClick={() => {}} />
          <Checkbox title="Programming" onClick={() => {}} />
          <Checkbox title="Programming" checked onClick={() => {}} />
        </div>
        <Button
          className="w-fit self-end Bold16 text-grayMain"
          variant="ghost"
          onClick={props.onClick}
        >
          Skip
        </Button>
      </OnBoardModalContainer>
    );
  }
};
export default OnBoardModal;

type OnBoardModalContainerProps = {
  children: React.ReactNode;
};

const OnBoardModalContainer = ({ children }: OnBoardModalContainerProps) => {
  return (
    <div className="w-[800px] rounded-[24px] py-10 px-8 flex flex-col space-y-8 bg-white drop-shadow-lg">
      {children}
    </div>
  );
};
