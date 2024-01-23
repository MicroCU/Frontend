import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export const refreshAccessToken = async (t: JWT) => {
  try {
    const resp = await fetch(process.env.MCV_ACCESS_TOKEN_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + t.access_token
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        client_id: process.env.MCV_CLIENT_ID,
        client_secret: process.env.MCV_CLIENT_SECRET,
        refresh_token: t.refresh_token
      })
    });

    const refreshedTokens = await resp.json();
    if (!resp.ok) {
      throw refreshedTokens;
    }
    return {
      access_token: refreshedTokens.access_token,
      refresh_token: refreshedTokens.refresh_token,
      expires_at: refreshedTokens.expires_at
    };
  } catch (error) {
    console.log(error);
    return {
      ...t,
      error: "RefreshAccessTokenError"
    };
  }
};

export const logoutMCV = () => {
  signOut({
    redirect: false
  });
  window.location.href = "https://www.mycourseville.com/api/logout";
};
