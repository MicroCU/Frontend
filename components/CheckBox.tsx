import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  title: string;
  checked?: boolean;
  onClick: () => void;
};

const Checkbox = ({ title, checked, onClick }: CheckboxProps) => {
  return (
    <Button
      className={cn(
        "flex justify-between py-[10px] px-[18px] text-grayMain bg-graySmall",
        checked ? "bg-primary text-white" : ""
      )}
    >
      <h1 className="Bold16 text-left">{title}</h1>
      <CheckCircle2 />
    </Button>
  );
};
export default Checkbox;
