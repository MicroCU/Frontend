import { ArrowLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const NavHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src="chula.svg" className="w-[35px] h-[13px]" />
        <h1 className="Bold16 text-primary">µCU</h1>
      </div>
      <LanguageSwitcher />
      <ArrowLeft className="text-grayMain" />
    </div>
  );
};

export default NavHeader;
