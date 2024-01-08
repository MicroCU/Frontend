import { ListVideo, File } from "lucide-react";

interface VideoIconProps {
  isSelected: boolean;
  type: "playlist" | "file";
}

const VideoIcon: React.FC<VideoIconProps> = ({ isSelected, type }) => {
  return (
    <button type="button">
      {type == "playlist" ? (
        <ListVideo
          className={`cursor-pointer ${
            isSelected ? "text-primary" : "text-white"
          }`}
          strokeWidth={3}
        />
      ) : (
        <File
          className={`cursor-pointer ${
            isSelected ? "text-primary" : "text-white"
          }`}
          strokeWidth={3}
        />
      )}
    </button>
  );
};

export default VideoIcon;
