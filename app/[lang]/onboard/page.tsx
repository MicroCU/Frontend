"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OnboardLoading from "@/components/onboard/OnBoardLoading";
import OnBoardModal from "@/components/onboard/OnBoardModal";
import { useOnBoard } from "@/context/Onboard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Settings } from "lucide-react";

const OnBoardContent = () => {
  const { page, question, isLoading } = useOnBoard();

  const CurrentModal = () => {
    switch (page) {
      case 0:
        return <OnBoardModal variant="welcome" />;
      case question.length + 1:
        return <OnBoardModal variant="finish" />;
      default:
        return question.map((q, index) => {
          if (
            (q.variant === "radio" || q.variant === "checkbox") &&
            page === q.step
          ) {
            return (
              <OnBoardModal
                step={q.step}
                key={index}
                variant={q.variant}
                title={q.title}
                choices={q.choices}
              />
            );
          }
        });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-danger">
      <div className="absolute top-0 left-0">
        <Popover>
          <PopoverTrigger className="text-grayLight flex flex-row gap-x-2">
            <Settings /> Language
          </PopoverTrigger>
          <PopoverContent className="w-fit bg-white shadow-md">
            <LanguageSwitcher />
          </PopoverContent>
        </Popover>
      </div>
      {isLoading ? <OnboardLoading /> : <CurrentModal />}
    </div>
  );
};

export default OnBoardContent;
