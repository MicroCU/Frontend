import { Maximize, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import VideoNav from "./VideoNav";
import { Slider } from "@/components/ui/slider";

interface VideoControlProps {
  onPlayPause: () => void;
  playing: boolean;
  played: number;
  onSeek: (value: number[]) => void;
  onSeekMouseUp: (value: number[]) => void;
}

const VideoControl = ({
  onPlayPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
}: VideoControlProps) => {
  return (
    <div className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full">
      <VideoNav videoName={"Example"} />
      <div>mid</div>
      <div className="px-4">
        <Slider
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
            <Volume2 color="white" />
            <Slider
              variant="volume"
              defaultValue={[100]}
              max={100}
              step={1}
              className="w-20"
            />
            <p className="text-white Medium16">2.01 / 5.34</p>
          </div>
          <div className="flex justify-end items-center w-1/2 gap-5">
            <p className="text-white Medium16">1x</p>
            <Maximize color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControl;
