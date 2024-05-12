"use client";

import { authorize } from "@/action/mcv";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ReactNode } from "react";

const LoginPanel = () => {
  return (
    <div className="flex">
      <div className="flex flex-col w-full gap-2 p-2">
        <AuthButton
          onClick={() => authorize({})}
          preText="Login with"
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
        <AuthButton
          onClick={() => authorize({ isChulaIT: true })}
          preText="Login with"
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
        <AuthButton
          onClick={() => {
            window.location.href = "https://www.mycourseville.com/api/register";
          }}
          preText="Register with"
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
      </div>
    </div>
  );
};

export default LoginPanel;

const AuthButton = ({
  onClick,
  Icon,
  preText
}: {
  onClick: () => void;
  Icon: ReactNode;
  preText: string;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="border-grayMedium border hover:border-primary"
    >
      {preText}
      {Icon}
      account
    </Button>
  );
};
