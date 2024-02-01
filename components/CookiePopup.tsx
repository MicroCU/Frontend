import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

let Readmore = "https://www.w3schools.com/";

const CookiePopup = () => {
  return (
    <div className="absolute w-full bottom-0">
      <div className="bg-white mx-auto max-w-[640px] rounded-t-lg px-5 py-8 shadow-lg">
        <div className="flex gap-4">
          <p>MicroCU uses cookies to let you login and analyze web traffic.</p>
          <a href={Readmore} target="_blank" className="text-primary ">
            Read more.
          </a>
        </div>

        <Separator className="my-4 bg-graySmall" />
        <div className="flex justify-end gap-2">
          <Button variant={"container"}>Accept all cookies</Button>
          <Button variant={"secondary"}>Decline</Button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
