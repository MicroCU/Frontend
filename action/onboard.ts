"use server";
import {
  onBoardGoalQuestion,
  onBoardNoGoalQuestion
} from "@/constants/onboard";

export const fetchGoalQuestion = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return onBoardGoalQuestion;
};

export const fetchNoGoalQuestion = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return onBoardNoGoalQuestion;
};

export const storeMCVPref = async () => {
  //TODO: implement this
  return;
};
