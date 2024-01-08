import { ArrowLeft } from "lucide-react";

const NavHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src="chula.svg" className="w-[35px] h-[13px]" />
        <h1 className="Bold16 text-primary">µCU</h1>
      </div>
      <ArrowLeft className="text-grayMain" />
    </div>
  );
};

export default NavHeader;
