"use client";

import { useState } from "react";
import VideoIcon from "./VideoIcon";
import VideoTitle from "./VideoTitle";

interface VideoNavProps {
  videoName: string;
  className?: string;
}

const VideoNav: React.FC<VideoNavProps> = ({ videoName, className }) => {
  const [isPlaylistSelected, setIsPlaylistSelected] = useState<boolean>(false);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  return (
    <div className={`${className} flex w-full justify-between p-8`}>
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
