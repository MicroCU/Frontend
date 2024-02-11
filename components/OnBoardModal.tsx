"use client";
import { CheckCircle } from "lucide-react";
import LinearProgressBar from "./LinearProgressBar";
import OnBoardBtn from "./OnBoardBtn";
import { Button } from "./ui/button";
import Radio from "./Radio";
import Checkbox from "./CheckBox";
import { useEffect } from "react";
import { OnBoardMode } from "@/types/enum";
import { useTranslation } from "@/context/Translation";
import { useOnBoard } from "@/context/Onboard";

type OnBoardModalProps =
  | {
      variant: "welcome";
    }
  | {
      variant: "finish";
    }
  | {
      variant: "radio";
      step: number;
      title: string;
      choices: string[];
    }
  | {
      variant: "checkbox";
      step: number;
      title: string;
      choices: string[];
    };

const OnBoardModal = (props: OnBoardModalProps) => {
  const { dict } = useTranslation();
  const { answer, addAnswer, page, maxPage, nextPage } = useOnBoard();
  const ModalBody = () => {
    switch (props.variant) {
      case "welcome":
        return (
          <>
            <div>
              <h1 className="text-grayMedium Bold24">
                {dict["onboard.welcome.title"]}
              </h1>
              <h1 className="text-grayMain Bold32">
                {dict["onboard.introduction.question"]}
              </h1>
            </div>
            <div className="space-y-6">
              <OnBoardBtn
                text={dict["onboard.introduction.haveGoal"]}
                onClick={() => {
                  addAnswer("welcome", OnBoardMode.GOAL);
                  nextPage();
                }}
              />
              <h1 className="text-grayMedium Bold24 text-center">
                {" "}
                {dict["onboard.introduction.optionWord"]}{" "}
              </h1>
              <OnBoardBtn
                text={dict["onboard.introduction.noGoal"]}
                onClick={() => {
                  addAnswer("welcome", OnBoardMode.NOGOAL);
                  nextPage();
                }}
              />
            </div>
          </>
        );
      case "finish":
        return (
          <>
            <LinearProgressBar currSteps={maxPage} maxSteps={maxPage} />
            <div className="space-y-8 flex flex-col items-center p-[40px] ">
              <CheckCircle className="text-success w-20 h-20" />
              <div className="space-y-4">
                <h1 className="Bold32 text-grayMain text-center">
                  {" "}
                  {dict["onboard.finish.title"]}{" "}
                </h1>
                <h1 className="Bold16 text-grayMedium text-center">
                  {dict["onboard.finish.subtitle"]}
                </h1>
              </div>
              <Button
                className="w-fit"
                onClick={() => {
                  nextPage();
                  // window.location.href = Route.LANDING;
                }}
              >
                {dict["onboard.finish.button"]}
              </Button>
            </div>
          </>
        );
      case "radio":
        return (
          <>
            <LinearProgressBar currSteps={page} maxSteps={maxPage} />
            <h1 className="text-grayMain Bold32">{props.title}</h1>
            <div className="space-y-6 max-h-[200px] overflow-y-auto">
              {props.choices.map((c, index) => {
                return (
                  <Radio
                    key={index}
                    name={props.title}
                    title={c}
                    checked={answer[props.title] === c}
                    onSelect={() => addAnswer(props.title, c)}
                  />
                );
              })}
            </div>
            <Button
              className="w-fit self-end Bold16 text-grayMain"
              variant="ghost"
              onClick={nextPage}
            >
              Skip
            </Button>
          </>
        );
      case "checkbox":
        return <CheckBoxBody title={props.title} choices={props.choices} />;
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
};

const CheckBoxBody = (props: CheckBoxBodyProps) => {
  const { answer, addAnswer, page, nextPage, maxPage } = useOnBoard();

  useEffect(() => {
    if (!answer[props.title]) {
      addAnswer(props.title, []);
    }
  }, [addAnswer, answer, props.title]);

  return (
    <>
      <LinearProgressBar currSteps={page} maxSteps={maxPage} />
      <h1 className="text-grayMain Bold32">{props.title}</h1>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 max-h-[200px] overflow-y-auto">
        {props.choices.map((c, index) => {
          return (
            <Checkbox
              key={index}
              title={c}
              checked={answer[props.title]?.includes(c) || false}
              onCheck={() => {
                if (answer[props.title].includes(c)) {
                  addAnswer(
                    props.title,
                    (answer[props.title] as string[]).filter(
                      (item) => item !== c
                    )
                  );
                } else {
                  addAnswer(props.title, [
                    ...(answer[props.title] as string[]),
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
        onClick={nextPage}
      >
        Skip
      </Button>
    </>
  );
};
