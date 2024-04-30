"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MicroType } from "@/types/enum";
import I18nTypo from "./ui/I18nTypo";

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
    <Button
      className="bg-white text-grayMain hover:bg-primary hover:text-white Bold24 w-[530px] py-6"
      onClick={handleRoute}
    >
      <I18nTypo>{choiceName}</I18nTypo>
    </Button>
  );
};

export default VideoChoice;
