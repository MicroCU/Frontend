"use client";

import { fetchGoalQuestion, fetchNoGoalQuestion } from "@/action/onboard";
import { Answer, Question } from "@/constants/onboard";
import { OnBoardMode } from "@/types/enum";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";
import { useTranslation } from "./Translation";

type OnBoardContextType = {
  page: number;
  maxPage: number;
  answer: Answer;
  question: Question;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  nextPage: () => void;
  backPage: () => void;
  addAnswer: (title: string, answer: string | string[]) => void;
  fetchQuestion: (mode: OnBoardMode) => void;
};

const OnBoardContext = createContext<OnBoardContextType>({
  page: 0,
  maxPage: 0,
  answer: {},
  question: [],
  isLoading: false,
  setIsLoading: () => {},
  nextPage: () => {},
  backPage: () => {},
  addAnswer: () => {},
  fetchQuestion: () => {}
});

export const useOnBoard = () => {
  if (!OnBoardContext) {
    throw new Error("useOnBoard must be used within OnBoardContextProvider");
  }
  return useContext(OnBoardContext);
};

type OnBoardContextProviderProps = {
  children: ReactNode;
};

const OnBoardContextProvider = ({ children }: OnBoardContextProviderProps) => {
  const [page, setPage] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>([]);
  const { lang } = useTranslation();

  const fetchQuestion = async (mode: OnBoardMode) => {
    setIsLoading(true);
    if (mode === OnBoardMode.GOAL) {
      const q = await fetchGoalQuestion(lang);
      setQuestion(q);
    } else {
      const q = await fetchNoGoalQuestion(lang);
      setQuestion(q);
    }
    setIsLoading(false);
  };

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
      value={{
        page,
        answer,
        nextPage,
        addAnswer,
        isLoading,
        question,
        maxPage,
        backPage,
        setIsLoading,
        fetchQuestion
      }}
    >
      {children}
    </OnBoardContext.Provider>
  );
};

export default OnBoardContextProvider;
