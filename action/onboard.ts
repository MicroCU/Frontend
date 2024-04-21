"use server";
import { AuthError } from "@/constants/error";
import {
  onBoardGoalQuestion,
  onBoardNoGoalQuestion
} from "@/constants/onboard";
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
    const data = await fetch(
      "https://www.mycourseville.com/api-dev/v1/public/micro/journeys/get?lang=th",
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      }
    );
    const resp: GetJourneysResp = await data.json();
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
export const storeMCVPref = async () => {
  const accessToken = cookies().get("access_token");
  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }

  // mock
  const params = {
    jid1: 2,
    jid2: null,
    jid3: null
  };

  let url = `https://www.mycourseville.com/api-dev/v1/public/micro/journeys/post?jid1=${params.jid1}`;
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
  } catch (e) {
    console.log(e);
  }

  return;
};
