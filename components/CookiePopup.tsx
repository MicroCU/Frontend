"use client";

import { Cookie } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

let Readmore = "https://www.google.com/";

interface CookiePopupProps {
  isAccept: boolean;
}

const CookiePopup = ({ isAccept }: CookiePopupProps) => {
  const router = useRouter();

  const cookieHandler = () => {
    let cookie = "isAccept=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    document.cookie = cookie;
    router.refresh();
  };

  return (
    <div className={cn("absolute w-full bottom-0", isAccept && "hidden")}>
      <div className="bg-white mx-auto max-w-[640px] rounded-t-lg px-4 py-6 shadow-lg Reg12">
        <div className="flex gap-4">
          <p>MicroCU uses cookies to let you login and analyze web traffic.</p>
          <a href={Readmore} target="_blank" className="text-primary ">
            Read more.
          </a>
        </div>
        <div className="border-[1px] border-grayMedium rounded-lg p-3 my-2">
          <div className="flex justify-between">
            <p className="flex gap-2 items-center">
              <Cookie />
              Necessary cookies
            </p>
            <p className="text-success">Required</p>
          </div>
          <Separator className="my-2 bg-graySmall" />
          <p>
            These cookies let you login and use myCourseVille as an
            authenticated user.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant={"container"} onClick={cookieHandler}>
            Accept all cookies
          </Button>
          {/* <Button variant={"secondary"}>Decline</Button> */}
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
