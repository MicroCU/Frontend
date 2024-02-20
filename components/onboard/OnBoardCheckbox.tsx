import { useOnBoard } from "@/context/Onboard";
import { OnBoardModalContainer, QuestionWrapper } from "./OnBoardModal";
import Checkbox from "../CheckBox";

type OnBoardCheckboxProps = {
  title: string;
  choices: string[];
};

const OnboardCheckbox = (props: OnBoardCheckboxProps) => {
  const { answer, addAnswer } = useOnBoard();
  return (
    <OnBoardModalContainer>
      <QuestionWrapper title={props.title} choices={props.choices}>
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
      </QuestionWrapper>
    </OnBoardModalContainer>
  );
};

export default OnboardCheckbox;
