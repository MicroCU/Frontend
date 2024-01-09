"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface VideoChoiceProps {
  videoName: string;
  link: string;
}

const VideoChoice: React.FC<VideoChoiceProps> = ({ videoName, link }) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(link);
  };

  return (
    <Button
      className="bg-white text-grayMain hover:bg-primary hover:text-white Bold24 w-[530px] py-6"
      onClick={handleRoute}
    >
      {videoName}
    </Button>
  );
};

export default VideoChoice;
