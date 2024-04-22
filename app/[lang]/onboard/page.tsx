"use client";
import { getUserInfo } from "@/action/mcv";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OnboardLoading from "@/components/onboard/OnBoardLoading";
import OnBoardModal from "@/components/onboard/OnBoardModal";
import { useAuth } from "@/context/Auth";
import { useOnBoard } from "@/context/Onboard";

import { useTranslation } from "@/context/Translation";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-danger">
      <h1 className="absolute top-0 left-0 bg-white">
        {JSON.stringify(user?.id)}
        <br />
        {JSON.stringify(user?.name)}
        <br />
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
