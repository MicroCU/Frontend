import { cn } from "@/lib/utils";
import { VideoTabType } from "@/types/enum";
import { ListVideo, File } from "lucide-react";

interface VideoIconProps {
  currentTab: VideoTabType;
  videoTabHandle: (currentTab: VideoTabType) => void;
  type: VideoTabType;
}

const VideoIcon: React.FC<VideoIconProps> = ({
  currentTab,
  videoTabHandle,
  type
}) => {
  return (
    <button type="button" onClick={() => videoTabHandle(type)}>
      {type == VideoTabType.PLAYLIST && (
        <ListVideo
          className={cn(
            "cursor-pointer",
            currentTab == type ? "text-primary" : "text-white"
          )}
          strokeWidth={3}
          size={32}
        />
      )}
      {type == VideoTabType.FILE && (
        <File
          className={cn(
            "cursor-pointer",
            currentTab == type ? "text-primary" : "text-white"
          )}
          strokeWidth={3}
          size={32}
        />
      )}
    </button>
  );
};

export default VideoIcon;
