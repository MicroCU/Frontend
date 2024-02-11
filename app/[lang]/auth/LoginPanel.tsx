"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  authorize,
  refreshAccessToken,
  getUserInfo,
  logout
} from "@/action/mcv";
import { ReactNode } from "react";

const LoginPanel = () => {
  return (
    <div className="flex">
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
              src="/cu.svg"
              width={40}
              height={20}
              className="p-1 h-8"
              alt="cu"
            />
          }
        />
        <Separator className="my-4 bg-grayMedium" />
        <Button onClick={() => logout()}>Logout</Button>
        <Button onClick={() => getUserInfo()}>Get User</Button>
        <Button onClick={() => refreshAccessToken()}>Refresh Token</Button>
      </div>
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
