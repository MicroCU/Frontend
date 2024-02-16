"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoTitleProps {
  videoName: string;
  className?: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ videoName, className }) => {
  const router = useRouter();
  const handleGoBack = () => {
    const pathData = localStorage.getItem("pathData");
    if (!pathData) {
      router.push("/");
      return;
    }

    var path: {
      viewport: { x: number; y: number; zoom: number };
      pathName: string;
    } = JSON.parse(pathData);
    if (path.viewport) {
      router.push(
        `${path.pathName}?x=${path.viewport.x}&y=${path.viewport.y}&zoom=${path.viewport.zoom}`
      );
      return;
    }
    router.push(path.pathName ? path.pathName : "/");
  };

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <ChevronLeft
        className="cursor-pointer"
        size={38}
        color="#ffffff"
        strokeWidth={3}
        onClick={handleGoBack}
      />
      <p className="Bold32 text-white">{videoName}</p>
    </div>
  );
};

export default VideoTitle;
