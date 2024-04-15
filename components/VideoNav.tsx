"use client";

import VideoIcon from "./VideoIcon";
import VideoTitle from "./VideoTitle";
import { cn } from "@/lib/utils";
import { VideoTabType } from "@/types/enum";

interface VideoNavProps {
  videoName: string;
  currentTab: VideoTabType;
  videoTabHandle: (currentTab: VideoTabType) => void;
  isPlaylist: boolean;
  isFile: boolean;
  className?: string;
}

const VideoNav: React.FC<VideoNavProps> = ({
  videoName,
  currentTab,
  videoTabHandle,
  isPlaylist,
  isFile,
  className
}) => {
  return (
    <div className={cn("flex w-full justify-between p-8 relative", className)}>
      <VideoTitle videoName={videoName} />
      <div className="flex items-center gap-8">
        {isPlaylist && (
          <VideoIcon
            currentTab={currentTab}
            videoTabHandle={videoTabHandle}
            type={VideoTabType.PLAYLIST}
          />
        )}
        {isFile && (
          <VideoIcon
            currentTab={currentTab}
            videoTabHandle={videoTabHandle}
            type={VideoTabType.FILE}
          />
        )}
      </div>
    </div>
  );
};

export default VideoNav;
