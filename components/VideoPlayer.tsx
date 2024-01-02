"use client";

import ReactPlayer from "react-player";
import React, { useEffect, useRef, useState } from "react";
import VideoControl from "./VideoControl";

const VideoPlayer = () => {
  const [videoState, setVideoState] = useState({
    playing: true,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const controlRef = useRef<HTMLDivElement | null>(null);

  const handlePlay = () => {
    setVideoState({ ...videoState, playing: true });
    if (controlRef.current) {
        controlRef.current.style.visibility = "hidden";
      }
  }

  const handlePause = () => {
    setVideoState({ ...videoState, playing: false });
    if (controlRef.current) {
        controlRef.current.style.visibility = "visible";
      }
  }

  return isClient && (
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
        <VideoControl controlRef={controlRef} playing={videoState.playing}/>

    </div>
  );
};

export default VideoPlayer;
