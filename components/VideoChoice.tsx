"use client"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface VideoChoiceProps {
  choiceName: string|null;
  videoName: string;
  videoId: string;
}

const VideoChoice: React.FC<VideoChoiceProps> = ({ choiceName,videoName, videoId }) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleRoute = () => {
    const pathSegments = pathName.split("/");
    const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/video/${videoId}`;
    router.push(desiredPathUrl);
  };

  return (
    <Button
      className="bg-white text-grayMain hover:bg-primary hover:text-white Bold24 w-[530px] py-6"
      onClick={handleRoute}
    >
      {choiceName ?? "Go to " + videoName}
    </Button>
  );
};

export default VideoChoice;
