import { useOnBoard } from "@/context/Onboard";
import { useTranslation } from "@/context/Translation";
import { OnBoardModalContainer } from "./OnBoardModal";
import { CheckCircle } from "lucide-react";
import LinearProgressBar from "../LinearProgressBar";
import { Button } from "../ui/button";

const OnboardFinish = () => {
  const { dict } = useTranslation();
  const { answer, addAnswer, page, maxPage, nextPage } = useOnBoard();
  return (
    <OnBoardModalContainer>
      <LinearProgressBar currSteps={maxPage} maxSteps={maxPage} />
      <div className="space-y-8 flex flex-col items-center p-[40px] ">
        <CheckCircle className="text-success w-20 h-20" />
        <div className="space-y-4">
          <h1 className="Bold32 text-grayMain text-center">
            {dict["onboard.finish.title"]}
          </h1>
          <h1 className="Bold16 text-grayMedium text-center">
            {dict["onboard.finish.subtitle"]}
          </h1>
        </div>
        <Button
          className="w-fit"
          onClick={() => {
            nextPage();
          }}
        >
          {dict["onboard.finish.button"]}
        </Button>
      </div>
    </OnBoardModalContainer>
  );
};

export default OnboardFinish;
