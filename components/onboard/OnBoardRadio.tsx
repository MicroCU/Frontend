import { useOnBoard } from "@/context/Onboard";
import { OnBoardModalContainer, QuestionWrapper } from "./OnBoardModal";
import Radio from "../Radio";

type OnBoardRadioProps = {
  title: string;
  choices: string[];
};

const OnboardRadio = (props: OnBoardRadioProps) => {
  const { answer, addAnswer } = useOnBoard();
  return (
    <OnBoardModalContainer>
      <QuestionWrapper title={props.title} choices={props.choices}>
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
      </QuestionWrapper>
    </OnBoardModalContainer>
  );
};

export default OnboardRadio;
