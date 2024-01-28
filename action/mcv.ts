"use server";

import { redirect } from "next/navigation";

const MCV_OAUTH_URL = "https://www.mycourseville.com/api/oauth/authorize";
const MCV_ACCESS_TOKEN_URL =
  "https://www.mycourseville.com/api/oauth/access_token";
const MCV_USER_INFO_URL =
  "https://www.mycourseville.com/api/v1/public/users/me";

export const authorize = async ({ isChulaIT }: { isChulaIT?: boolean }) => {
  const query = new URLSearchParams({
    client_id: process.env.MCV_CLIENT_ID!,
    redirect_uri: process.env.HOST + "/api/auth/callback/mcv",
    response_type: "code",
    scope: "public",
    login_page: isChulaIT ? "itchula" : ""
  });

  redirect(MCV_OAUTH_URL + "?" + query.toString());
};

export const accessToken = (oauthToken: string) => {};

export const refreshToken = () => {};

export const getUserInfo = () => {};
