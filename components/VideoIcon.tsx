import { ListVideo, File } from "lucide-react";

interface VideoIconProps {
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  type: "playlist" | "file";
}

const VideoIcon: React.FC<VideoIconProps> = ({
  isSelected,
  setIsSelected,
  type
}) => {
  return (
    <button type="button" onClick={() => setIsSelected(!isSelected)}>
      {type == "playlist" ? (
        <ListVideo
          className={`cursor-pointer ${
            isSelected ? "text-primary" : "text-white"
          }`}
          strokeWidth={3}
          size={32}
        />
      ) : (
        <File
          className={`cursor-pointer ${
            isSelected ? "text-primary" : "text-white"
          }`}
          strokeWidth={3}
          size={32}
        />
      )}
    </button>
  );
};

export default VideoIcon;
