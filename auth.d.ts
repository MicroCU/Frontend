import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./types/type";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  //   interface Session {
  //     user: {
  //       /** The user's postal address. */
  //       address: string;
  //     } & DefaultSession["user"];
  //   }
  interface User {}

  interface Session {
    user: User;
    expires_at: number;
  }

  interface Account {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}
