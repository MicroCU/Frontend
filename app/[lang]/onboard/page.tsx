"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OnboardLoading from "@/components/onboard/OnBoardLoading";
import OnBoardModal from "@/components/onboard/OnBoardModal";
import { useOnBoard } from "@/context/Onboard";

import { useTranslation } from "@/context/Translation";
import Link from "next/link";

const OnBoardContent = () => {
  const { lang } = useTranslation();
  const { answer, page, question, isLoading } = useOnBoard();

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
      <h1 className="absolute top-0 left-0 bg-white">
        {JSON.stringify(answer)}
        <LanguageSwitcher />
        <br></br>
        <Link href={"/" + lang + "/example"}> go to example page </Link>
      </h1>
      {isLoading ? <OnboardLoading /> : <CurrentModal />}
    </div>
  );
};

export default OnBoardContent;
