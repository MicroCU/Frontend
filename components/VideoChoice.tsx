"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MicroType } from "@/types/enum";
import I18nTypo from "./ui/I18nTypo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface VideoChoiceProps {
  choiceName: string;
  microId: string;
  microType: MicroType;
  testLink: string;
}

const VideoChoice: React.FC<VideoChoiceProps> = ({
  choiceName,
  microId,
  microType,
  testLink
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleRoute = () => {
    if (microType === MicroType.Video) {
      const pathSegments = pathName.split("/");
      const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/video/${microId}`;
      router.push(desiredPathUrl);
    } else {
      router.push(testLink);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          className="bg-white text-grayMain hover:bg-primary hover:text-white Bold24 w-[23%] py-6 px-6"
          onClick={(e) => {
            e.stopPropagation();
            handleRoute();
          }}
        >
          <I18nTypo className="truncate leading-normal">{choiceName}</I18nTypo>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-0 border-none w-full">
        <div className="bg-white p-3 rounded-sm opacity-90">
          <I18nTypo className="text-grayMain Reg14">{choiceName}</I18nTypo>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default VideoChoice;
