"use client";

import {
  Answer,
  Question,
  onBoardGoalQuestion,
  onBoardNoGoalQuestion
} from "@/constants/onboard";
import { OnBoardMode } from "@/types/enum";
import { ReactNode, createContext, useContext, useState } from "react";

type OnBoardContextType = {
  page: number;
  maxPage: number;
  answer: Answer;
  question: Question;
  nextPage: () => void;
  backPage: () => void;
  addAnswer: (title: string, answer: string | string[]) => void;
};

const OnBoardContext = createContext<OnBoardContextType>({
  page: 0,
  maxPage: 0,
  answer: {},
  question: [],
  nextPage: () => {},
  backPage: () => {},
  addAnswer: () => {}
});

export const useOnBoard = () => {
  if (!OnBoardContext) {
    throw new Error("useOnBoard must be used within OnBoardContextProvider");
  }
  return useContext(OnBoardContext);
};

const OnBoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer>({});

  const question =
    answer["welcome"] === OnBoardMode.GOAL
      ? onBoardGoalQuestion
      : onBoardNoGoalQuestion;

  const maxPage = question.length + 1;

  const nextPage = () => {
    if (page === question.length + 1) {
      return;
    }
    setPage((p) => p + 1);
  };

  const backPage = () => {
    if (page === 0) {
      return;
    }
    setPage((p) => p - 1);
  };

  const addAnswer = (title: string, answer: string | string[]) => {
    setAnswer((prev) => ({ ...prev, [title]: answer }));
  };

  return (
    <OnBoardContext.Provider
      value={{ page, answer, nextPage, addAnswer, question, maxPage, backPage }}
    >
      {children}
    </OnBoardContext.Provider>
  );
};

export default OnBoardContextProvider;
