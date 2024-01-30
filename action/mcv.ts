"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AuthError } from "@/constants/error";

const MCV_REDIRECT_URL = process.env.HOST + "/api/auth/callback/mcv";

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
  redirect(process.env.MCV_OAUTH_URL + "?" + query.toString());
};

export const getAccessToken = async (oauthToken: string) => {
  const res = await fetch(process.env.MCV_ACCESS_TOKEN_URL!, {
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
  cookies().set("access_token", tokens.access_token, {
    expires: new Date(Date.now() + tokens.expires_in * 1000)
  });
  cookies().set("refresh_token", tokens.refresh_token, {
    httpOnly: true
  });
  return tokens;
};

export const getRefreshToken = async () => {
  const refreshToken = cookies().get("refresh_token");

  if (!refreshToken) {
    throw new Error(AuthError.ERR_REFRESH_TOKEN);
  }

  const res = await fetch(process.env.MCV_ACCESS_TOKEN_URL!, {
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
  const accessToken = cookies().get("access_token");

  if (!accessToken) {
    throw new Error(AuthError.ERR_ACCESS_TOKEN);
  }

  const res = await fetch(process.env.MCV_USER_INFO_URL!, {
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
  redirect(process.env.MCV_LOGOUT_URL!);
};
