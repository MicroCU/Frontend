import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Dispatch, SetStateAction } from "react";

interface NavHeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavHeader = ({ setIsOpen }: NavHeaderProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src="chula.svg" className="w-[35px] h-[13px]" />
        <h1 className="Bold16 text-primary">µCU</h1>
      </div>
      <LanguageSwitcher />
      <ArrowLeft
        className="text-grayMain"
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default NavHeader;
