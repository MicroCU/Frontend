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

type JourneyScore = {
  score: number;
  jid: number;
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
  console.log("Answer: ", answer);

  const PY = 10000;
  const ML = 20000;
  const DS = 30000;
  const DA = 40000;

  let score: JourneyScore[] = [
    { score: 2, jid: PY },
    { score: 1, jid: DS },
    { score: 1, jid: DA },
    { score: 0, jid: ML }
  ];

  if (answer[0] == 0) {
    console.log("NO GOAL");
    if (answer[1] == 0) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 2;
    }
    if (answer[1] == 1) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 3;
    }
    if (answer[1] == 2) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 4;
    }

    if (answer[2] == 0) {
    }
    if (answer[2] == 1) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score += 1;
    }
    if (answer[2] == 2) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score += 2;
    }

    if (answer[3] == 0) {
    }
    if (answer[3] == 1) {
      let index = score.findIndex((s) => s.jid === DS);
      score[index].score += 1;
    }
    if (answer[3] == 2) {
      let index = score.findIndex((s) => s.jid === DS);
      score[index].score += 2;
    }

    if (answer[4] == 0) {
    }
    if (answer[4] == 1) {
      let index = score.findIndex((s) => s.jid === ML);
      score[index].score += 1;
    }
    if (answer[4] == 2) {
      let index = score.findIndex((s) => s.jid === ML);
      score[index].score += 2;
    }
  }

  if (answer[0] == 1) {
    console.log("GOAL");
    if ((answer[1] as number[]).includes(0)) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 3;
    }
    if ((answer[1] as number[]).includes(1)) {
      let index = score.findIndex((s) => s.jid === DS);
      score[index].score += 3;
    }
    if ((answer[1] as number[]).includes(2)) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score += 3;
    }
    if ((answer[1] as number[]).includes(3)) {
      let index = score.findIndex((s) => s.jid === ML);
      score[index].score += 3;
    }

    if (answer[2] == 0) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 2;
    }
    if (answer[2] == 1) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score += 1;
    }
    if (answer[2] == 2) {
      let index = score.findIndex((s) => s.jid === PY);
      score[index].score -= 3;
    }

    if (answer[3] == 0) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score += 2;
    }
    if (answer[3] == 1) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score += 1;
    }
    if (answer[3] == 2) {
      let index = score.findIndex((s) => s.jid === DA);
      score[index].score -= 3;
    }
  }

  score = score.sort((a, b) => b.score - a.score);

  const params = {
    jid1: score[0],
    jid2: score[1],
    jid3: score[2]
  };

  console.log("Params: ", params);

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
