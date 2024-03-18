import { useOnBoard } from "@/context/Onboard";
import { useTranslation } from "@/context/Translation";
import { OnBoardMode } from "@/types/enum";
import OnBoardBtn from "./OnBoardBtn";
import { OnBoardModalContainer } from "./OnBoardModal";
import I18nTypo from "../ui/i18nTypo";

const OnboardWelcome = () => {
  const { dict, lang } = useTranslation();
  const { addAnswer, nextPage, fetchQuestion } = useOnBoard();

  return (
    <OnBoardModalContainer>
      <div>
        <I18nTypo className="text-grayMedium Bold24">
          {dict["onboard.welcome.title"]}
        </I18nTypo>
        <I18nTypo className="text-grayMain Bold32">
          {dict["onboard.introduction.question"]}
        </I18nTypo>
      </div>
      <div className="space-y-6">
        <OnBoardBtn
          text={dict["onboard.introduction.haveGoal"]}
          onClick={() => {
            addAnswer("welcome", OnBoardMode.GOAL);
            fetchQuestion(OnBoardMode.GOAL);
            nextPage();
          }}
        />
        <I18nTypo className="text-grayMedium Bold24 text-center">
          {dict["onboard.introduction.optionWord"]}
        </I18nTypo>
        <OnBoardBtn
          text={dict["onboard.introduction.noGoal"]}
          onClick={() => {
            addAnswer("welcome", OnBoardMode.NOGOAL);
            fetchQuestion(OnBoardMode.NOGOAL);
            nextPage();
          }}
        />
      </div>
    </OnBoardModalContainer>
  );
};

export default OnboardWelcome;
