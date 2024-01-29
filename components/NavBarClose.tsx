import { TabIconTypeEnum, TabIconModeEnum } from "@/types/enum";
import { ArrowRight } from "lucide-react";
import TabIcon from "./TabIcon";
import { Dispatch, SetStateAction } from "react";

interface NavBarCloseModeProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavBarCloseMode({ setIsOpen }: NavBarCloseModeProps) {
  return (
    <div className="bg-white shadow-md h-screen w-fit flex flex-col pt-6 px-[9px] gap-y-6 justify-start items-center">
      <ArrowRight
        className="text-grayMain"
        onClick={() => setIsOpen(true)}
        size={24}
      />
      <TabIcon type={TabIconTypeEnum.library} mode={TabIconModeEnum.OUTLINE} />
      <TabIcon type={TabIconTypeEnum.history} mode={TabIconModeEnum.OUTLINE} />
      <TabIcon type={TabIconTypeEnum.search} mode={TabIconModeEnum.OUTLINE} />
    </div>
  );
}
