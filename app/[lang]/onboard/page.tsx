"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OnBoardModal from "@/components/OnBoardModal";
import { useOnBoard } from "@/context/Onboard";

import { useTranslation } from "@/context/Translation";
import Link from "next/link";

const OnBoardContent = () => {
  const { lang } = useTranslation();
  const { answer, page, question } = useOnBoard();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-danger">
      <h1 className="absolute top-0 left-0 bg-white">
        {JSON.stringify(answer)}
        <LanguageSwitcher />
        <br></br>
        <Link href={"/" + lang + "/example"}> go to example page </Link>
      </h1>
      {page === 0 && <OnBoardModal variant="welcome" />}
      {question.map((q, index) => {
        if (
          (q.variant === "radio" || q.variant === "checkbox") &&
          page === q.step
        ) {
          return (
            <OnBoardModal
              key={index}
              variant={q.variant}
              step={q.step}
              title={q.title}
              choices={q.choices}
            />
          );
        }
      })}
      {page === question.length + 1 && <OnBoardModal variant="finish" />}
    </div>
  );
};

export default OnBoardContent;
