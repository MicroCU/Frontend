"use client";

import { Dispatch, SetStateAction, useState } from "react";
import VideoIcon from "./VideoIcon";
import VideoTitle from "./VideoTitle";

interface VideoNavProps {
  videoName: string;
  isPlaylistSelected: boolean;
  setIsPlaylistSelected: Dispatch<SetStateAction<boolean>>;
  isFileSelected: boolean;
  setIsFileSelected: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const VideoNav: React.FC<VideoNavProps> = ({
  videoName,
  isPlaylistSelected,
  setIsPlaylistSelected,
  isFileSelected,
  setIsFileSelected,
  className
}) => {
  return (
    <div className={`${className} flex w-full justify-between p-8 relative`}>
      <VideoTitle videoName={videoName} />
      <div className="flex items-center gap-8">
        <VideoIcon
          isSelected={isPlaylistSelected}
          setIsSelected={setIsPlaylistSelected}
          type="playlist"
        />
        <VideoIcon
          isSelected={isFileSelected}
          setIsSelected={setIsFileSelected}
          type="file"
        />
      </div>
    </div>
  );
};

export default VideoNav;
