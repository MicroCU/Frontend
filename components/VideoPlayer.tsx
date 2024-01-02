"use client";

import ReactPlayer from "react-player";
import React, { useEffect, useRef, useState } from "react";
import VideoMenu from "./VideoMenu";
import VideoNext from "./VideoNext";

const VideoPlayer = () => {
  const [videoState, setVideoState] = useState({
    playing: true,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const handlePlay = () => {
    setVideoState({ ...videoState, playing: true });
    if (menuRef.current) {
      menuRef.current.style.visibility = "hidden";
    }
    if (nextRef.current) {
      nextRef.current.style.visibility = "hidden";
    }
  };

  const handlePause = () => {
    setVideoState({ ...videoState, playing: false });
    if (menuRef.current) {
      menuRef.current.style.visibility = "visible";
    }
    if (nextRef.current) {
      nextRef.current.style.visibility = "visible";
    }
  };

  return (
    isClient && (
      <div className="relative bg-black flex flex-col justify-center items-center w-full h-screen">
        <ReactPlayer
          className="p-0 m-0 w-full h-full"
          url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          //   url="https://www.youtube.com/watch?v=J3pF2jkQ4vc"
          width="100%"
          height="100%"
          playing={true}
          muted={true}
          controls={true}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <VideoMenu menuRef={menuRef} playing={videoState.playing} />
        <VideoNext nextRef={nextRef} playing={false} />
      </div>
    )
  );
};

export default VideoPlayer;
