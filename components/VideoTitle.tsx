"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoTitleProps {
  videoName: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ videoName }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center gap-6">
      <ChevronLeft className="cursor-pointer" size={38} color="#ffffff" strokeWidth={3} onClick={handleGoBack}/>
      <p className="Bold32 text-white">{videoName}</p>
    </div>
  );
};

export default VideoTitle;
