import { Button } from "../ui/button";
import I18nTypo from "../ui/i18nTypo";

type OnBoardBtnProps = {
  text: string;
  onClick?: () => void;
};

const OnBoardBtn = ({ text, onClick }: OnBoardBtnProps) => {
  return (
    <Button
      className="w-full py-[24px] Bold24 text-grayMain bg-white rounded-[8px] outline-2 outline outline-graySmall hover:outline-none hover:bg-primary hover:text-white"
      onClick={onClick}
    >
      <I18nTypo>{text}</I18nTypo>
    </Button>
  );
};
export default OnBoardBtn;
