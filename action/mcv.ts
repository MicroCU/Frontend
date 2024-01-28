"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const MCV_OAUTH_URL = "https://www.mycourseville.com/api/oauth/authorize";
const MCV_ACCESS_TOKEN_URL =
  "https://www.mycourseville.com/api/oauth/access_token";
const MCV_REDIRECT_URL = process.env.HOST + "/api/auth/callback/mcv";
const MCV_USER_INFO_URL =
  "https://www.mycourseville.com/api/v1/public/users/me";
const MCV_LOGOUT_URL = "https://www.mycourseville.com/api/logout";

type MCVAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

type MCVUserInfoResponse = {
  status: string;
  user: {
    id: string;
    title_en: string;
    firstname_en: string;
    lastname_en: string;
    title_th: string;
    firstname_th: string;
    lastname_th: string;
  };
};

export const authorize = async ({ isChulaIT }: { isChulaIT?: boolean }) => {
  const query = new URLSearchParams({
    client_id: process.env.MCV_CLIENT_ID!,
    redirect_uri: MCV_REDIRECT_URL,
    response_type: "code",
    scope: "public",
    login_page: isChulaIT ? "itchula" : ""
  });
  redirect(MCV_OAUTH_URL + "?" + query.toString());
};

export const getAccessToken = async (oauthToken: string) => {
  const res = await fetch(MCV_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: process.env.MCV_CLIENT_ID!,
      client_secret: process.env.MCV_CLIENT_SECRET!,
      redirect_uri: MCV_REDIRECT_URL,
      code: oauthToken
    })
  });

  const tokens: MCVAccessTokenResponse = await res.json();
  console.log(tokens);
  cookies().set("access_token", tokens.access_token);
  cookies().set("refresh_token", tokens.refresh_token);
  return tokens;
};

export const getRefreshToken = async () => {
  const refreshToken = cookies().get("refresh_token");

  if (!refreshToken || !refreshToken.value) throw new Error("No refresh token");

  const res = await fetch(MCV_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: process.env.MCV_CLIENT_ID!,
      client_secret: process.env.MCV_CLIENT_SECRET!,
      refresh_token: refreshToken.value
    })
  });

  const tokens = await res.json();
  console.log(tokens);
  // cookies().set("access_token", tokens.access_token);
  return tokens;
};

export const getUserInfo = async () => {
  checkAccessToken();
  const accessToken = cookies().get("access_token");

  if (!accessToken || !accessToken.value) throw new Error("No access token");

  const res = await fetch(MCV_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    }
  });

  const user: MCVUserInfoResponse = await res.json();
  console.log(user);
  return user;
};

export const logout = () => {
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  redirect(MCV_LOGOUT_URL);
};

export const checkAccessToken = async () => {
  const accessToken = cookies().get("access_token");
  const refreshToken = cookies().get("refresh_token");
  console.log(accessToken, refreshToken);

  // if (!refreshToken) {
  //   redirect(process.env.HOST + "/th/auth");
  // }

  // if (!accessToken) {
  //   const res = await getRefreshToken();
  //   if (res.status !== 200) {
  //     redirect(process.env.HOST + "/th/auth");
  //   }
  // }

  return;
};
