"use client";

import { fetchPath } from "@/action/path";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoControlLayer from "@/components/VideoControlLayer";
import { usePath } from "@/context/Path";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { OnProgressProps } from "react-player/base";

export interface VideoState {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean;
  speed: number;
  ended: boolean;
}

let count = 0;

const VideoPage = ({ params }: { params: { vid: string } }) => {
  const [isClient, setIsClient] = useState(false);

  const { pathInfo, setPathInfo } = usePath();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPath(params.vid);
        if (response.status != 200) {
          setError(response.message ? response.message : "Error fetching data");
          return;
        }
        setPathInfo(response.data.path);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!pathInfo) {
      fetchData();
    }
  }, []);

  const currentMicroData = pathInfo?.groups
    .flatMap((group) => group.micros)
    .find((micro) => micro.id === params.vid);
  const videoData = currentMicroData?.video;

  const videoPlayerRef = useRef<ReactPlayer>(null);
  const controlRef = useRef<HTMLDivElement | null>(null);

  const [videoState, setVideoState] = useState<VideoState>({
    playing: false,
    muted: false,
    volume: 1,
    played: (videoData?.progress ?? 0) / 100,
    seeking: false,
    buffer: true,
    speed: 1,
    ended: false
  });

  const { playing, muted, volume, seeking, speed, ended } = videoState;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : 0.0;

  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : 0.0;

  const formatTime = (time: number) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    if (hours) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds} `;
    } else return `${minutes}:${seconds}`;
  };

  const formatCurrentTime = formatTime(currentTime);

  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    setVideoState({
      ...videoState,
      playing: !videoState.playing,
      ended: false
    });
  };

  const rewindHandler = () => {
    videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };

  const fastFowardHandler = () => {
    videoPlayerRef.current?.seekTo(videoPlayerRef.current.getCurrentTime() + 5);
  };

  const progressHandler = (state: OnProgressProps) => {
    if (controlRef.current && !ended) {
      if (count > 2) {
        controlRef.current.style.visibility = "hidden";
        setIsHidden(true);
      } else if (controlRef.current.style.visibility === "visible") {
        count += 1;
        setIsHidden(false);
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
      setIsHidden(false);
    }
    count = 0;
  };

  const speedHandler = (value: string) => {
    setVideoState({ ...videoState, speed: Number(value) });
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

  const endingHandler = () => {
    setVideoState({ ...videoState, playing: false, ended: true });
    if (controlRef.current) {
      controlRef.current.style.visibility = "visible";
      setIsHidden(false);
    }
  };

  const bufferStartHandler = () => {
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    setVideoState({ ...videoState, buffer: false });
  };

  const onVideoReady = useCallback(() => {
    if (!isVideoReady) {
      videoPlayerRef.current?.seekTo((videoData?.progress ?? 0) / 100);
      setIsVideoReady(true);
    }
  }, [isVideoReady]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      playPauseHandler();
      mouseMoveHandler();
    }
    if (event.key === "ArrowLeft") {
      rewindHandler();
      mouseMoveHandler();
    }
    if (event.key === "ArrowRight") {
      fastFowardHandler();
      mouseMoveHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [videoState]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!pathInfo) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!currentMicroData || !videoData) {
    return <div>no video</div>;
  }
  return (
    isClient && (
      <div
        className={cn(
          "relative bg-black flex flex-col justify-center items-center w-full h-screen",
          isHidden && "cursor-none"
        )}
        onMouseMove={mouseMoveHandler}
        onClick={mouseMoveHandler}
      >
        <ReactPlayer
          ref={videoPlayerRef}
          className="p-0 m-0 w-full h-full"
          url={videoData?.link}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          controls={false}
          volume={volume}
          onProgress={progressHandler}
          playbackRate={speed}
          onEnded={endingHandler}
          onBuffer={bufferStartHandler}
          onBufferEnd={bufferEndHandler}
          onReady={onVideoReady}
        />
        <VideoControlLayer
          videoName={videoData?.title || ""}
          controlRef={controlRef}
          onPlayPause={playPauseHandler}
          onSeek={seekHandler}
          onSeekMouseUp={seekMouseUpHandler}
          onVolumeChangeHandler={volumeChangeHandler}
          onVolumeSeekUp={volumeSeekUpHandler}
          onMute={muteHandler}
          duration={formatDuration}
          currentTime={formatCurrentTime}
          fullscreenHandler={handleFullScreenToggle}
          isFullScreen={isFullScreen}
          speedHandler={speedHandler}
          isHidden={isHidden}
          videoState={videoState}
          microData={currentMicroData}
        />
      </div>
    )
  );
};

export default VideoPage;
