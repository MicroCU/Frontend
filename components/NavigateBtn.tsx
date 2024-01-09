import { ChevronLeft } from "lucide-react";

export default function NavigateBtn() {
  return (
    <div className="flex flex-row bg-graySmall text-grayMain rounded-lg pr-3 pl-1 py-2 w-fit">
      <ChevronLeft className="w-fit" /> <p> Back </p>
    </div>
  );
}
