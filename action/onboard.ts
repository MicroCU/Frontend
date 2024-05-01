"use server";
import { AuthError } from "@/constants/error";
import {
  Answer,
  onBoardGoalQuestion,
  onBoardNoGoalQuestion
} from "@/constants/onboard";
import { useOnBoard } from "@/context/Onboard";
import { cookies } from "next/headers";

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

  // mock
  // TODO: Yod will provide the real data by analysing from the user's answer
  console.log(answer);

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
