import {
  Maximize,
  Minimize,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";
import VideoNav from "./VideoNav";
import { Slider } from "@/components/ui/slider";
import { MutableRefObject } from "react";

interface VideoControlProps {
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
}

const VideoControl = ({
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
}: VideoControlProps) => {
  return (
    <div ref={controlRef} style={{"visibility":"visible"}} className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full">
      <VideoNav videoName={"Example"} />
      <div className="h-full" onClick={onPlayPause}></div>
      <div className="px-4">
        <Slider
          className="cursor-pointer"
          variant="video"
          defaultValue={[0]}
          max={100}
          step={0.01}
          value={[played * 100]}
          onValueChange={onSeek}
          onValueCommit={onSeekMouseUp}
        />
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center w-1/2 gap-5">
            <div className="cursor-pointer" onClick={onPlayPause}>
              {playing ? <Pause color="white" /> : <Play color="white" />}
            </div>
            <SkipForward color="white" />
            <div className="cursor-pointer" onClick={onMute}>
              {muted ? <VolumeX color="white" /> : <Volume2 color="white" />}
            </div>
            <Slider
              variant="volume"
              defaultValue={[100]}
              max={100}
              step={1}
              value={muted ? [0] : [volume * 100]}
              className="w-20 cursor-pointer"
              onValueChange={onVolumeChangeHandler}
              onValueCommit={onVolumeSeekUp}
            />
            <p className="text-white Medium16">{currentTime} / {duration}</p>
          </div>
          <div className="flex justify-end items-center w-1/2 gap-5">
            <p className="text-white Medium16">1x</p>
            <div className="cursor-pointer" onClick={fullscreenHandler}>
              {isFullScreen ? <Minimize color="white" /> : <Maximize color="white"/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControl;
