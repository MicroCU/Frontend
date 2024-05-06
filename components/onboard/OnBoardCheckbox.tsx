import { useOnBoard } from "@/context/Onboard";
import { OnBoardModalContainer, QuestionWrapper } from "./OnBoardModal";
import Checkbox from "../CheckBox";

type OnBoardCheckboxProps = {
  title: string;
  step: number;
  choices: string[];
  required: boolean;
};

const OnboardCheckbox = (props: OnBoardCheckboxProps) => {
  const { answer, addAnswer } = useOnBoard();
  return (
    <OnBoardModalContainer>
      <QuestionWrapper
        title={props.title}
        choices={props.choices}
        step={props.step}
        required={props.required}
      >
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 max-h-[200px] overflow-y-auto">
          {props.choices.map((c, index) => {
            return (
              <Checkbox
                key={index}
                title={c}
                checked={
                  (answer[props.step] as number[] | undefined)?.includes(
                    index
                  ) || false
                }
                onCheck={() => {
                  if (
                    (answer[props.step] as number[] | undefined)?.includes(
                      index
                    )
                  ) {
                    addAnswer(
                      props.step,
                      (answer[props.step] as number[]).filter(
                        (item) => item !== index
                      )
                    );
                  } else {
                    addAnswer(props.step, [
                      ...(answer[props.step] as number[]),
                      index
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
