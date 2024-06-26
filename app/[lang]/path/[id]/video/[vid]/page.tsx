"use client";

import { fetchPath } from "@/action/path";
import { updateVideoProgress } from "@/action/video";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoControlLayer from "@/components/VideoControlLayer";
import {
  KalturaPlayerProvider,
  PlayerBundleConfig
} from "@/components/kalturaPlayer";
import {
  EntriesConfig,
  PlayerContainer
} from "@/components/kalturaPlayer/player-container";
import { usePath } from "@/context/Path";
import { useTranslation } from "@/context/Translation";
import { cn } from "@/lib/utils";
import { VideoType } from "@/types/enum";
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

const VideoPage = ({ params }: { params: { id: string; vid: string } }) => {
  const [isClient, setIsClient] = useState(false);

  const { pathInfo, setSelectedPathId, pathId } = usePath();

  useEffect(() => {
    setSelectedPathId(params.id);
  }, []);

  const currentMicroData = pathInfo?.groups
    .flatMap((group) => group.micros)
    .find((micro) => micro.id === params.vid);
  const videoData = currentMicroData?.video;

  const [playerConfig, setPlayerConfig] = useState<PlayerBundleConfig | null>(
    null
  );
  const [entriesConfig, setEntriesConfig] = useState<EntriesConfig>();

  useEffect(() => {
    const fetchConfig = async () => {
      const url = new URL(videoData?.link || "").origin;

      const pRegex = /\/p\/(\d+)\//;
      const uiconfIdRegex = /\/uiconf_id\/(\d+)/;

      const pMatch = videoData?.link.match(pRegex);
      const partnerId = pMatch ? pMatch[1] : "";

      const uiconfIdMatch = videoData?.link.match(uiconfIdRegex);
      const uiConfId = uiconfIdMatch ? uiconfIdMatch[1] : "";

      setPlayerConfig({
        bundlerUrl: url,
        partnerId: partnerId,
        uiConfId: uiConfId
      });
      setEntriesConfig({
        entryId: videoData?.sourceId || ""
      });
    };
    if (videoData?.sourceType == "kaltura") {
      fetchConfig();
    }
  }, [videoData]);

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

  const formatCurrentTime = formatTime(currentTime);

  const formatDuration = formatTime(duration);

  const playPauseHandler = (playing?: boolean) => {
    if (playing !== undefined) {
      setVideoState({
        ...videoState,
        playing: playing,
        ended: false
      });
    } else {
      setVideoState({
        ...videoState,
        playing: !videoState.playing,
        ended: false
      });
    }
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
    const handleUpdateVideoProgress = async () => {
      const totalTick = Math.min(duration, 400);
      const secondToUpdate = totalTick < 400 ? 1 : duration / totalTick;
      const tick = Math.floor(currentTime / secondToUpdate);
      if (
        currentTime >= secondToUpdate * tick &&
        currentTime < secondToUpdate * tick + 1
      ) {
        try {
          await updateVideoProgress(
            videoData?.sourceId || "",
            pathId || "",
            videoData?.sourceType === VideoType.Youtube
              ? "yt"
              : videoData?.sourceType || "",
            totalTick,
            Array.from({ length: tick }, (_, i) => i)
          );
        } catch (e) {
          console.log(e);
        }
      }
    };
    if (videoData && videoData.sourceType == VideoType.Youtube) {
      handleUpdateVideoProgress();
    }
  }, [currentTime]);

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
  if (videoData.sourceType == "kaltura" && playerConfig && entriesConfig) {
    return (
      <KalturaPlayerProvider playerBundleConfig={playerConfig}>
        <PlayerContainer
          entriesConfig={entriesConfig}
          microData={currentMicroData}
        />
      </KalturaPlayerProvider>
    );
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
          url={getVideoLink(videoData.sourceId, videoData.sourceType)}
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

function getVideoLink(sourceId: string, sourceType: string) {
  if (sourceType == "youtube-v") {
    return `https://www.youtube.com/watch?v=${sourceId}`;
  } else if (sourceType == "vimeo") {
    return `https://vimeo.com/${sourceId}`;
  } else {
    return "";
  }
}
