import { useOnBoard } from "@/context/Onboard";
import { useTranslation } from "@/context/Translation";
import { OnBoardMode } from "@/types/enum";
import OnBoardBtn from "./OnBoardBtn";
import { OnBoardModalContainer } from "./OnBoardModal";

const OnboardWelcome = () => {
  const { dict } = useTranslation();
  const { addAnswer, nextPage } = useOnBoard();
  return (
    <OnBoardModalContainer>
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
          {dict["onboard.introduction.optionWord"]}
        </h1>
        <OnBoardBtn
          text={dict["onboard.introduction.noGoal"]}
          onClick={() => {
            addAnswer("welcome", OnBoardMode.NOGOAL);
            nextPage();
          }}
        />
      </div>
    </OnBoardModalContainer>
  );
};

export default OnboardWelcome;
