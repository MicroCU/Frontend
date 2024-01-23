import { refreshAccessToken } from "@/api/auth";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

type MCVProfile = {
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

const mcvoauth: OAuthConfig<MCVProfile> = {
  id: "mcv",
  name: "mcv",
  type: "oauth",
  clientId: process.env.MCV_CLIENT_ID,
  clientSecret: process.env.MCV_CLIENT_SECRET,
  authorization: {
    url: process.env.MCV_OAUTH_URL,
    params: {
      scope: "public",
      redirect_uri: "http://localhost:3000/api/auth/callback/mcv"
    }
  },
  token: {
    url: process.env.MCV_ACCESS_TOKEN_URL,
    params: {
      grant_type: "authorization_code"
    }
  },
  userinfo: {
    url: process.env.MCV_USER_INFO_URL
  },
  profile(profile: MCVProfile, tokens) {
    // return as User;
    const d = new Date(tokens.expires_at! * 1000);
    console.log("Will expires in", d.toString());

    const fullName = `${profile.user.title_en} ${profile.user.firstname_en} ${profile.user.lastname_en}`;
    return {
      id: profile.user.id,
      name: fullName
    };
  }
};

const authOptions: AuthOptions = {
  providers: [mcvoauth],
  callbacks: {
    async jwt({ token, account, user, trigger }) {
      // return as Token;

      if (trigger === "signIn") {
        console.log("Sign in 🥳");
        printDebug("token", token);
        printDebug("account", account);
        printDebug("user", user);
        return {
          access_token: account!.access_token,
          refresh_token: account!.refresh_token,
          expires_at: account!.expires_at,
          user
        };
      }

      if (Date.now() < token.expires_at * 1000) {
        console.log("Token is still valid 🥳");
        return token as any;
      }

      console.log("Need to refresh token 🥺");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // return as Session;
      const sess = {
        user: {
          id: token.user.id,
          name: token.user.name
        },
        expires_at: token.expires_at
      };
      return sess as any;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

const printDebug = (title: any, text: any) => {
  console.log(title);
  console.log("------------------------------------");
  console.log(text);
  console.log("------------------------------------");
};
