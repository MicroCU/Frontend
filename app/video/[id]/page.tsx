"use client";

import VideoControl from "@/components/VideoControl";
import VideoNav from "@/components/VideoNav";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPageProps {
  params: {
    id: string;
  };
}

const VideoPage = ({ params }: VideoPageProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (isClient && (
    <div className="relative bg-black flex flex-col justify-center items-center w-full h-screen">
      <ReactPlayer
        className="p-0 m-0 w-full h-full"
        url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
        // url="https://www.youtube.com/watch?v=KnZmaNZ2Bck"
        width="100%"
        height="100%"
        playing={true}
        muted={true}
        controls={false}
        //   onPlay={handlePlay}
        //   onPause={handlePause}
        //   onEnded={handleEnded}
      />
      <VideoControl/>
    </div>
  ));
};

export default VideoPage;
