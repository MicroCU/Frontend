"use server";
import { AuthError } from "@/constants/error";
import {
  Answer,
  onBoardGoalQuestionEN,
  onBoardGoalQuestionTH,
  onBoardNoGoalQuestionEN,
  onBoardNoGoalQuestionTH
} from "@/constants/onboard";
import { cookies } from "next/headers";
import { fetchALLJourney } from "./journey";

export const fetchGoalQuestion = async (lang: string) => {
  if (lang === "en") return onBoardGoalQuestionEN;
  return onBoardGoalQuestionTH;
};

export const fetchNoGoalQuestion = async (lang: string) => {
  if (lang === "en") return onBoardNoGoalQuestionEN;
  return onBoardNoGoalQuestionTH;
};

type GetJourneysResp = {
  data: {
    total: number; // for checking if user is on board
  };
  status: string;
};
export const checkIsOnBoard = async () => {
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }
  try {
    const data = await fetch(process.env.MCV_JOURNEY_URL!, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });
    const resp: GetJourneysResp = await data.json();
    console.log(resp);
    if (resp.data.total > 0) return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};

type PostJourneysResp = {
  data: string;
  status: string;
};
export const storeMCVPref = async (answer: Answer) => {
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }

  const allJourneys = await fetchALLJourney();
  // mock
  // TODO: Yod will provide the real data by analysing from the user's answer
  // answer = answer from onboarding
  console.log("All journeys: ", allJourneys);

  const params = {
    jid1: 2,
    jid2: null,
    jid3: null
  };
  let url = process.env.MCV_JOURNEY_POST_URL! + `?jid1=${params.jid1}`;
  if (params.jid2) {
    url += `&jid2=${params.jid2}`;
  }
  if (params.jid3) {
    url += `&jid3=${params.jid3}`;
  }

  try {
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken.value}`
      }
    });
    const resp: PostJourneysResp = await data.json();
    console.log(resp);
  } catch (e) {
    console.log(e);
  }

  return;
};
