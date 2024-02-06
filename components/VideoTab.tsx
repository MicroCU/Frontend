import { cn } from "@/lib/utils";
import FileTabItem from "./FileTabItem";
import PlaylistTabItem from "./PlaylistTabItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlaylistItem {
  videoName: string;
  imageURL: string;
  link: string;
}

interface FileItem {
  fileName: string;
  fileUrl: string;
}

interface VideoPlaylistTabProps {
  data: PlaylistItem[];
  className?: string;
}

interface VideoFileTabProps {
  data: FileItem[];
  className?: string;
}

const VideoPlaylistTab: React.FC<VideoPlaylistTabProps> = ({
  data,
  className
}) => {
  return (
    <ScrollArea
      style={{ position: "absolute" }}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[368px] transition-right ease-in-out duration-300",
        className
      )}
    >
      <div
        className={`flex flex-col gap-4 `}
        onClick={(e) => e.stopPropagation()}
      >
        {data.map((item, index) => (
          <PlaylistTabItem
            key={index}
            videoName={item.videoName}
            imageURL={item.imageURL}
            link={item.link}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

const VideoFileTab: React.FC<VideoFileTabProps> = ({ data, className }) => {
  return (
    <ScrollArea
      style={{ position: "absolute" }}
      onClick={(e) => e.stopPropagation()}
      className={`${className} overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[368px] transition-right ease-in-out duration-300`}
    >
      <div className={`flex flex-col gap-4 `}>
        {data.map((item, index) => (
          <FileTabItem
            key={index}
            fileName={item.fileName}
            fileUrl={item.fileUrl}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default { VideoPlaylistTab, VideoFileTab };
