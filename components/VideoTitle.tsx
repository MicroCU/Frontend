"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import I18nTypo from "./ui/I18nTypo";

interface VideoTitleProps {
  videoName: string;
  className?: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({ videoName, className }) => {
  const router = useRouter();
  const pathName = usePathname(); // /en/path/1-p3/video/3
  const handleGoBack = () => {
    const pathData = localStorage.getItem("pathData");

    var path: {
      viewport: { id: string; x: number; y: number; zoom: number };
      pathName: string;
    } = JSON.parse(pathData || "{}");

    const pathSegments = pathName.split("/"); // ["", "en", "path", "1-p3", "video", "3"]
    const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`; // /en/path/1-p3
    const desiredVideoId = pathSegments[5];
    if (
      desiredPathUrl !== path.pathName ||
      desiredVideoId !== path.viewport.id
    ) {
      router.push(desiredPathUrl);
      return;
    }

    if (path.viewport) {
      router.push(
        `${path.pathName}?x=${path.viewport.x}&y=${path.viewport.y}&zoom=${path.viewport.zoom}`
      );
      return;
    }
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
      <p className="Bold32 text-white">
        <I18nTypo>{videoName}</I18nTypo>
      </p>
    </div>
  );
};

export default VideoTitle;
