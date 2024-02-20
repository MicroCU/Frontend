"use client";
import LinearProgressBar from "../LinearProgressBar";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useOnBoard } from "@/context/Onboard";
import OnboardWelcome from "./OnBoardWelcome";
import OnboardFinish from "./OnBoardFinish";
import OnboardRadio from "./OnBoardRadio";
import OnboardCheckbox from "./OnBoardCheckbox";

type OnBoardModalProps =
  | {
      variant: "welcome" | "finish";
    }
  | {
      variant: "radio" | "checkbox";
      title: string;
      choices: string[];
    };

const OnBoardModal = (props: OnBoardModalProps) => {
  const Modal = () => {
    switch (props.variant) {
      case "welcome":
        return <OnboardWelcome />;
      case "finish":
        return <OnboardFinish />;
      case "radio":
        return <OnboardRadio title={props.title} choices={props.choices} />;
      case "checkbox":
        return <OnboardCheckbox title={props.title} choices={props.choices} />;
    }
  };
  return <Modal />;
};
export default OnBoardModal;

type OnBoardModalContainerProps = {
  children: React.ReactNode;
};

export const OnBoardModalContainer = ({
  children
}: OnBoardModalContainerProps) => {
  return (
    <div
      className="w-[800px] rounded-[24px] p-12
     flex flex-col space-y-8 bg-white drop-shadow-lg"
    >
      {children}
    </div>
  );
};

type QuestionWrapperProps = {
  children: React.ReactNode;
  title: string;
  choices: string[];
};

export const QuestionWrapper = (props: QuestionWrapperProps) => {
  const { answer, addAnswer, page, nextPage, maxPage, backPage } = useOnBoard();

  useEffect(() => {
    if (!answer[props.title]) {
      addAnswer(props.title, []);
    }
  }, [addAnswer, answer, props.title]);

  return (
    <>
      <LinearProgressBar currSteps={page} maxSteps={maxPage} />
      <h1 className="text-grayMain Bold32">{props.title}</h1>
      {props.children}
      <div className="flex justify-between">
        <Button
          className="w-fit self-end Bold16 text-grayMain"
          variant="ghost"
          onClick={backPage}
        >
          Back
        </Button>
        <Button
          className="w-fit self-end Bold16 text-grayMain"
          variant="ghost"
          onClick={nextPage}
        >
          {answer[props.title]?.length === 0 ? "Skip" : "Next"}
        </Button>
      </div>
    </>
  );
};
