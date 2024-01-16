import { Play, SkipForward, Volume2 } from "lucide-react";
import VideoNav from "./VideoNav";
import { Slider } from "@/components/ui/slider";

const VideoControl = () => {
  return (
    <div className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full">
      <VideoNav videoName={"Example"} />
      <div>mid</div>
      <div className="px-4">
        <Slider variant="video" defaultValue={[0]} max={100} step={1} />
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center w-1/2 gap-5">
            <Play color="white" />
            <SkipForward color="white" />
            <Volume2 color="white" />
            <Slider variant="volume" defaultValue={[100]} max={100} step={1} className="w-20"/>
            <p className="text-white Medium16">2.01 / 5.34</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControl;
