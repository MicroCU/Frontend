"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OnBoardModal from "@/components/OnBoardModal";
import {
  Answer,
  onBoardGoalQuestion,
  onBoardNoGoalQuestion
} from "@/constants/onboard";
import { useLangContext } from "@/context/Language";
import { OnBoardMode } from "@/types/enum";
import Link from "next/link";
import { useState } from "react";

const OnBoardContent = () => {
  const langMode = useLangContext();

  const [page, setPage] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer>({});

  const nextPage = () => {
    if (page === question.length + 1) {
      return;
    }
    setPage((p) => p + 1);
  };

  const AddAnswer = (title: string, answer: string | string[]) => {
    setAnswer((prev) => ({ ...prev, [title]: answer }));
  };

  const question =
    answer["welcome"] === OnBoardMode.GOAL
      ? onBoardGoalQuestion
      : onBoardNoGoalQuestion;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-danger">
      <h1 className="absolute top-0 left-0 bg-white">
        {JSON.stringify(answer)}
        <LanguageSwitcher />
        <br></br>
        <Link href={"/" + langMode + "/example"}> go to example page </Link>
      </h1>
      {page === 0 && (
        <OnBoardModal
          variant="welcome"
          onClick={nextPage}
          addAnswer={AddAnswer}
        />
      )}
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
              onClick={nextPage}
              answer={answer}
              addAnswer={AddAnswer}
              page={page}
              maxPage={question.length + 1}
            />
          );
        }
      })}
      {page === question.length + 1 && (
        <OnBoardModal
          variant="finish"
          onClick={nextPage}
          maxPage={question.length + 1}
          addAnswer={AddAnswer}
        />
      )}
    </div>
  );
};

export default OnBoardContent;
