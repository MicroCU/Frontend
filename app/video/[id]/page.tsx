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

let count = 0;

const VideoPage = ({ params }: VideoPageProps) => {
  const [isClient, setIsClient] = useState(false);

  const videoPlayerRef = useRef<ReactPlayer>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  const [videoState, setVideoState] = useState<VideoState>({
    playing: true,
    muted: false,
    volume: 1,
    played: 0,
    seeking: false,
    buffer: true
  });

  const { playing, muted, volume, played, seeking, buffer } = videoState;

  const [isFullScreen, setIsFullScreen] = useState(false);

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : 0.0;

  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : 0.0;

  const formatTime = (time: number) => {
    //formarting duration of video
    if (isNaN(time)) {
      return "00:00";
    }

    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    if (hours) {
      return `${hours}:${minutes.toString().padStart(2, "0")} `;
    } else return `${minutes}:${seconds}`;
  };

  const formatCurrentTime = formatTime(currentTime);

  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const progressHandler = (state: OnProgressProps) => {
    if (controlRef.current) {
      console.log(count);
      if (count > 2) {
        controlRef.current.style.visibility = "hidden";
      } else if (controlRef.current.style.visibility === "visible") {
        count += 1;
      }
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (value: number[]) => {
    setVideoState({ ...videoState, played: value[0] / 100 });
  };

  const seekMouseUpHandler = (value: number[]) => {
    setVideoState({ ...videoState, seeking: false });
    (videoPlayerRef.current as ReactPlayer | null)?.seekTo(value[0] / 100);
  };

  const volumeChangeHandler = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0
    });
  };

  const volumeSeekUpHandler = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0
    });
  };

  const muteHandler = () => {
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const mouseMoveHandler = () => {
    if (controlRef.current) {
      controlRef.current.style.visibility = "visible";
    }
    count = 0;
  };

  const handleFullScreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if ((event.key === ' ' || event.key === 'Spacebar')) {
      event.preventDefault(); // Prevent scrolling the page when using the space bar
      playPauseHandler();
      mouseMoveHandler();   
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [videoState]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div
        className="relative bg-black flex flex-col justify-center items-center w-full h-screen"
        onMouseMove={mouseMoveHandler}
        onClick={mouseMoveHandler}
      >
        <ReactPlayer
          ref={videoPlayerRef}
          className="p-0 m-0 w-full h-full"
          url="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          // url="https://www.youtube.com/watch?v=KnZmaNZ2Bck"
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          controls={false}
          volume={volume}
          onProgress={progressHandler}
        />
        <VideoControl
          controlRef={controlRef}
          onPlayPause={playPauseHandler}
          playing={playing}
          played={played}
          onSeek={seekHandler}
          onSeekMouseUp={seekMouseUpHandler}
          onVolumeChangeHandler={volumeChangeHandler}
          onVolumeSeekUp={volumeSeekUpHandler}
          muted={muted}
          onMute={muteHandler}
          volume={volume}
          duration={formatDuration}
          currentTime={formatCurrentTime}
          fullscreenHandler={handleFullScreenToggle}
          isFullScreen={isFullScreen}
        />
      </div>
    )
  );
};

export default VideoPage;
