import VideoNav from "./VideoNav";
import { MutableRefObject } from "react";
import VideoController from "./VideoController";

interface VideoControlLayerProps {
  onPlayPause: () => void;
  playing: boolean;
  played: number;
  onSeek: (value: number[]) => void;
  onSeekMouseUp: (value: number[]) => void;
  onVolumeChangeHandler: (value: number[]) => void;
  onVolumeSeekUp: (value: number[]) => void;
  muted: boolean;
  onMute: () => void;
  volume: number;
  duration: string;
  currentTime: string;
  controlRef: MutableRefObject<HTMLDivElement | null>;
  fullscreenHandler: () => void;
  isFullScreen: boolean;
  speed: number;
  speedHandler: (value: string) => void;
}

const VideoControlLayer = ({
  onPlayPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  muted,
  onMute,
  volume,
  duration,
  currentTime,
  controlRef,
  fullscreenHandler,
  isFullScreen,
  speed,
  speedHandler
}: VideoControlLayerProps) => {
  return (
    <div
      ref={controlRef}
      style={{ visibility: "visible" }}
      className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full"
    >
      <VideoNav videoName={"Example"} />
      <div className="h-full" onClick={onPlayPause}></div>
      <VideoController
        onPlayPause={onPlayPause}
        playing={playing}
        played={played}
        onSeek={onSeek}
        onSeekMouseUp={onSeekMouseUp}
        onVolumeChangeHandler={onVolumeChangeHandler}
        onVolumeSeekUp={onVolumeSeekUp}
        muted={muted}
        onMute={onMute}
        volume={volume}
        duration={duration}
        currentTime={currentTime}
        fullscreenHandler={fullscreenHandler}
        isFullScreen={isFullScreen}
        speed={speed}
        speedHandler={speedHandler}
      />
    </div>
  );
};

export default VideoControlLayer;
