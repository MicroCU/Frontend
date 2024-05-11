import { cn } from "@/lib/utils";
import FileTabItem from "./FileTabItem";
import PlaylistTabItem from "./PlaylistTabItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentData } from "@/types/type";
import { MicroType } from "@/types/enum";

interface PlaylistItem {
  id: string;
  name: string;
  type: MicroType;
  link: string;
}

interface VideoPlaylistTabProps {
  data: PlaylistItem[];
  className?: string;
}

interface VideoFileTabProps {
  data: DocumentData[];
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
        <p className="Bold16">Path Playlist</p>
        {data.map((item, index) => (
          <PlaylistTabItem
            key={index}
            id={item.id}
            name={item.name}
            type={item.type}
            testLink={item.link}
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
      className={cn(
        "overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[368px] transition-right ease-in-out duration-300",
        className
      )}
    >
      <div className={`flex flex-col gap-4 `}>
        {data.map((item, index) => (
          <FileTabItem key={index} data={item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default { VideoPlaylistTab, VideoFileTab };
