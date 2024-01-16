"use client";

import VideoControl from "@/components/VideoControl";
import VideoNav from "@/components/VideoNav";
import { useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { OnProgressProps } from "react-player/base";

interface VideoPageProps {
  params: {
    id: string;
  };
}

interface VideoState {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean;
}

const VideoPage = ({ params }: VideoPageProps) => {
  const [isClient, setIsClient] = useState(false);

  const videoPlayerRef = useRef(null);

  const [videoState, setVideoState] = useState<VideoState>({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: true
  });

  const { playing, muted, volume, played, seeking, buffer } = videoState;

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const progressHandler = (state: OnProgressProps) => {
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (value: number[]) => {
    console.log(value);
    
    setVideoState({ ...videoState, played: value[0] / 100 });
  };

  const seekMouseUpHandler = (value: number[]) => {
    setVideoState({ ...videoState, seeking: false });
    (videoPlayerRef.current as ReactPlayer | null)?.seekTo(value[0] / 100);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div className="relative bg-black flex flex-col justify-center items-center w-full h-screen">
        <ReactPlayer
          ref={videoPlayerRef}
          className="p-0 m-0 w-full h-full"
          url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          // url="https://www.youtube.com/watch?v=KnZmaNZ2Bck"
          width="100%"
          height="100%"
          playing={playing}
          muted={true}
          controls={false}
          onProgress={progressHandler}
        />
        <VideoControl
          onPlayPause={playPauseHandler}
          playing={playing}
          played={played}
          onSeek={seekHandler}
          onSeekMouseUp={seekMouseUpHandler}
        />
      </div>
    )
  );
};

export default VideoPage;
