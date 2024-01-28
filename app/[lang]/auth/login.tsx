"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logoutMCV } from "@/api/auth";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { authorize } from "@/action/mcv";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginPanel = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="flex">
      <Tabs defaultValue="NextAuth" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 bg-grayLight mb-6">
          <TabsTrigger value="NextAuth">NextAuth</TabsTrigger>
          <TabsTrigger value="MyAuth">MyAuth</TabsTrigger>
        </TabsList>
        <TabsContent value="NextAuth">
          <div className="flex flex-col w-full gap-2 p-2">
            <LoginButton
              onClick={() => signIn("mcv")}
              Icon={
                <Image
                  src="/cv-logo.png"
                  width={100}
                  height={20}
                  alt="mcv"
                  className="p-2 h-8"
                />
              }
            />
            <LoginButton
              onClick={() => signIn("mcv")}
              Icon={
                <Image
                  src="/account-link-logo-cu.svg"
                  width={40}
                  height={20}
                  className="p-1 h-8"
                  alt="cu"
                />
              }
            />
            <Separator className="my-4 bg-grayMedium" />
            <Button onClick={() => logoutMCV()}>Logout</Button>
          </div>
        </TabsContent>
        <TabsContent value="MyAuth">
          <div className="flex flex-col w-full gap-2 p-2">
            <LoginButton
              onClick={() => authorize({})}
              Icon={
                <Image
                  src="/cv-logo.png"
                  width={100}
                  height={20}
                  alt="mcv"
                  className="p-2 h-8"
                />
              }
            />
            <LoginButton
              onClick={() => authorize({ isChulaIT: true })}
              Icon={
                <Image
                  src="/account-link-logo-cu.svg"
                  width={40}
                  height={20}
                  className="p-1 h-8"
                  alt="cu"
                />
              }
            />
            <Separator className="my-4 bg-grayMedium" />
            <Button onClick={() => logoutMCV()}>Logout</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPanel;

const LoginButton = ({
  onClick,
  Icon
}: {
  onClick: () => void;
  Icon: ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="border-grayMedium border hover:border-primary"
    >
      Login in with
      {Icon}
      account
    </Button>
  );
};
