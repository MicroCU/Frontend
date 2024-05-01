import { useOnBoard } from "@/context/Onboard";
import { OnBoardModalContainer, QuestionWrapper } from "./OnBoardModal";
import Radio from "../Radio";

type OnBoardRadioProps = {
  title: string;
  step: number;
  choices: string[];
};

const OnboardRadio = (props: OnBoardRadioProps) => {
  const { answer, addAnswer } = useOnBoard();
  return (
    <OnBoardModalContainer>
      <QuestionWrapper
        title={props.title}
        choices={props.choices}
        step={props.step}
      >
        <div className="space-y-6 max-h-[200px] overflow-y-auto">
          {props.choices.map((c, index) => {
            return (
              <Radio
                key={index}
                name={props.title}
                title={c}
                checked={answer[props.step] === index}
                onSelect={() => addAnswer(props.step, index)}
              />
            );
          })}
        </div>
      </QuestionWrapper>
    </OnBoardModalContainer>
  );
};

export default OnboardRadio;
