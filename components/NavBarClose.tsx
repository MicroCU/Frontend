import { MenuTab } from "@/types/enum";
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
        className="text-grayMain cursor-pointer"
        onClick={() => setIsOpen(true)}
        size={24}
      />
      <TabIcon type={MenuTab.journey} />
      <TabIcon type={MenuTab.recently} />
      <TabIcon type={MenuTab.search} />
    </div>
  );
}
