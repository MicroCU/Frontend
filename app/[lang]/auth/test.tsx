"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logoutMCV } from "@/api/auth";

const AuthTest = () => {
  const { data } = useSession();

  console.log(data);

  return (
    <div className="bg-white p-10">
      <h1 className="min-w-0 max-w-[800px]">
        {JSON.stringify(data?.user)}
        {JSON.stringify(data?.expires_at)}
      </h1>
      <div className="flex flex-col w-full gap-2 p-2">
        <Button onClick={() => signIn("mcv")}>Login with MCV</Button>
        <Button onClick={logoutMCV}>Logout</Button>
      </div>
    </div>
  );
};

export default AuthTest;
