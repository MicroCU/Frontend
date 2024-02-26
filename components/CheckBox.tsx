import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  title: string;
  checked?: boolean;
  onCheck: () => void;
};

const Checkbox = ({ title, checked, onCheck }: CheckboxProps) => {
  return (
    <Button
      className={cn(
        "flex justify-between py-[10px] px-[18px] text-grayMain bg-graySmall hover:text-white hover:bg-grayMedium",
        checked ? "bg-primary text-white" : ""
      )}
      onClick={onCheck}
    >
      <h1 className="Bold16 text-left">{title}</h1>
      <CheckCircle2 />
    </Button>
  );
};
export default Checkbox;
