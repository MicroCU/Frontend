import { CheckCircle } from "lucide-react";
import LinearProgressBar from "./LinearProgressBar";
import OnBoardBtn from "./OnBoardBtn";
import { Button } from "./ui/button";
import Radio from "./Radio";
import Checkbox from "./CheckBox";
import { Answer } from "@/constants/onboard";
import { useEffect } from "react";
import { OnBoardMode } from "@/types/enum";

type OnBoardModalProps =
  | {
      variant: "welcome";
      addAnswer: (title: string, answer: string) => void;
      onClick: () => void;
    }
  | {
      variant: "finish";
      addAnswer: (title: string, answer: string) => void;
      maxPage: number;
      onClick: () => void;
    }
  | {
      variant: "radio";
      step: number;
      title: string;
      choices: string[];
      addAnswer: (title: string, answer: string) => void;
      onClick: () => void;
      page: number;
      maxPage: number;
      answer: Answer;
    }
  | {
      variant: "checkbox";
      step: number;
      title: string;
      choices: string[];
      addAnswer: (title: string, answer: string[]) => void;
      onClick: () => void;
      page: number;
      maxPage: number;
      answer: Answer;
    };

const OnBoardModal = (props: OnBoardModalProps) => {
  const ModalBody = () => {
    switch (props.variant) {
      case "welcome":
        return (
          <>
            <div>
              <h1 className="text-grayMedium Bold24">Welcome,</h1>
              <h1 className="text-grayMain Bold32">
                Are there any courses you&apos;d like to take?
              </h1>
            </div>
            <div className="space-y-6">
              <OnBoardBtn
                text="Sure! can’t wait anymore"
                onClick={() => {
                  props.addAnswer("welcome", OnBoardMode.GOAL);
                  props.onClick();
                }}
              />
              <h1 className="text-grayMedium Bold24 text-center">Or</h1>
              <OnBoardBtn
                text="Nah, I don’t have anything in my mind."
                onClick={() => {
                  props.addAnswer("welcome", OnBoardMode.NOGOAL);
                  props.onClick();
                }}
              />
            </div>
          </>
        );
      case "finish":
        return (
          <>
            <LinearProgressBar
              currSteps={props.maxPage}
              maxSteps={props.maxPage}
            />
            <div className="space-y-8 flex flex-col items-center p-[40px] ">
              <CheckCircle className="text-success w-20 h-20" />
              <div className="space-y-4">
                <h1 className="Bold32 text-grayMain text-center">All Set!</h1>
                <h1 className="Bold16 text-grayMedium text-center">
                  Enjoy your Learning
                </h1>
              </div>
              <Button
                className="w-fit"
                onClick={() => {
                  props.onClick();
                  // window.location.href = Route.LANDING;
                }}
              >
                Go to Path
              </Button>
            </div>
          </>
        );
      case "radio":
        return (
          <>
            <LinearProgressBar
              currSteps={props.page}
              maxSteps={props.maxPage}
            />
            <h1 className="text-grayMain Bold32">{props.title}</h1>
            <div className="space-y-6 max-h-[200px] overflow-y-auto">
              {props.choices.map((c, index) => {
                return (
                  <Radio
                    key={index}
                    name={props.title}
                    title={c}
                    checked={props.answer[props.title] === c}
                    onSelect={() => props.addAnswer(props.title, c)}
                  />
                );
              })}
            </div>
            <Button
              className="w-fit self-end Bold16 text-grayMain"
              variant="ghost"
              onClick={props.onClick}
            >
              Skip
            </Button>
          </>
        );
      case "checkbox":
        return (
          <CheckBoxBody
            title={props.title}
            choices={props.choices}
            answer={props.answer}
            addAnswer={props.addAnswer}
            onClick={props.onClick}
            page={props.page}
            maxPage={props.maxPage}
          />
        );
    }
  };

  return (
    <OnBoardModalContainer>
      <ModalBody />
    </OnBoardModalContainer>
  );
};
export default OnBoardModal;

// ------------------ PRIVATE COMPONENTS ------------------

type OnBoardModalContainerProps = {
  children: React.ReactNode;
};

const OnBoardModalContainer = ({ children }: OnBoardModalContainerProps) => {
  return (
    <div
      className="w-[800px] rounded-[24px] p-12
     flex flex-col space-y-8 bg-white drop-shadow-lg"
    >
      {children}
    </div>
  );
};

type CheckBoxBodyProps = {
  title: string;
  choices: string[];
  answer: Answer;
  addAnswer: (title: string, answer: string[]) => void;
  onClick: () => void;
  page: number;
  maxPage: number;
};

const CheckBoxBody = (props: CheckBoxBodyProps) => {
  useEffect(() => {
    if (!props.answer[props.title]) {
      props.addAnswer(props.title, []);
    }
  }, [props]);

  return (
    <>
      <LinearProgressBar currSteps={props.page} maxSteps={props.maxPage} />
      <h1 className="text-grayMain Bold32">{props.title}</h1>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 max-h-[200px] overflow-y-auto">
        {props.choices.map((c, index) => {
          return (
            <Checkbox
              key={index}
              title={c}
              checked={props.answer[props.title]?.includes(c) || false}
              onCheck={() => {
                if (props.answer[props.title].includes(c)) {
                  props.addAnswer(
                    props.title,
                    (props.answer[props.title] as string[]).filter(
                      (item) => item !== c
                    )
                  );
                } else {
                  props.addAnswer(props.title, [
                    ...(props.answer[props.title] as string[]),
                    c
                  ]);
                }
              }}
            />
          );
        })}
      </div>
      <Button
        className="w-fit self-end Bold16 text-grayMain"
        variant="ghost"
        onClick={props.onClick}
      >
        Skip
      </Button>
    </>
  );
};
