import {
  Maximize,
  Minimize,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeX
} from "lucide-react";
import { Slider } from "./ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { VideoState } from "@/app/[lang]/video/[id]/page";

interface VideoControllerProps {
  onPlayPause: () => void;
  onSeek: (value: number[]) => void;
  onSeekMouseUp: (value: number[]) => void;
  onVolumeChangeHandler: (value: number[]) => void;
  onVolumeSeekUp: (value: number[]) => void;
  onMute: () => void;
  duration: string;
  currentTime: string;
  fullscreenHandler: () => void;
  isFullScreen: boolean;
  speedHandler: (value: string) => void;
  videoState: VideoState;
  className?: string;
}

const VideoController = ({
  onPlayPause,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  onMute,
  duration,
  currentTime,
  fullscreenHandler,
  isFullScreen,
  speedHandler,
  videoState: { playing, played, muted, volume, speed },
  className
}: VideoControllerProps) => {
  return (
    <div className={`px-4 ${className}`}>
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
          <p className="text-white Medium16 cursor-default">
            {currentTime} / {duration}
          </p>
        </div>
        <div className="flex justify-end items-center w-1/2 gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="text-white Medium16 cursor-pointer">
                {Number(speed).toFixed(1) + "x"}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuRadioGroup
                value={speed.toString()}
                onValueChange={speedHandler}
              >
                <DropdownMenuRadioItem
                  className="hover:bg-graySmall  cursor-pointer"
                  value="2"
                >
                  2.0x
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="hover:bg-graySmall  cursor-pointer"
                  value="1.5"
                >
                  1.5x
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="hover:bg-graySmall  cursor-pointer"
                  value="1"
                >
                  1.0x
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="cursor-pointer" onClick={fullscreenHandler}>
            {isFullScreen ? (
              <Minimize color="white" />
            ) : (
              <Maximize color="white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoController;
