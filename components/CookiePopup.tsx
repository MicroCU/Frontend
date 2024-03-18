"use client";

import { Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Switch } from "./ui/switch";

let Readmore = "https://www.google.com/";

interface CookiePopupProps {
  className?: string;
}

const CookiePopup = ({ className }: CookiePopupProps) => {
  const [isAccept, setIsAccept] = useState(true);

  useEffect(() => {
    setIsAccept(hasCookie("isCookieAccept"));
  }, []);

  const acceptCookie = () => {
    setIsAccept(true);
    setCookie("isCookieAccept", "true", {});
  };

  return (
    <div
      className={cn(
        "absolute w-full bottom-0",
        isAccept && "hidden",
        className
      )}
    >
      <div className="bg-white mx-auto max-w-[640px] rounded-t-lg px-4 py-6 shadow-lg Reg12">
        <div className="flex gap-4">
          <p>
            <span className="Bold12">MicroCU</span> uses cookies to let you
            login and analyze web traffic.
          </p>
          <a href={Readmore} target="_blank" className="text-primary ">
            Read more.
          </a>
        </div>
        <div className="border-[1px] border-grayMedium rounded-lg p-3 my-2">
          <div className="flex justify-between">
            <p className="flex gap-2 items-center">
              <Cookie />
              <span className="Bold12">Necessary cookies</span>
            </p>
            <Switch disabled={true} defaultChecked={true}/>
          </div>
          <Separator className="my-2 bg-graySmall" />
          <p>
            These cookies let you login and use myCourseVille as an
            authenticated user.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant={"container"} onClick={acceptCookie}>
            Accept all cookies
          </Button>
          {/* <Button variant={"secondary"}>Decline</Button> */}
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
