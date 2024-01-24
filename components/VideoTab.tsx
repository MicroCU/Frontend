import FileTabItem from "./FileTabItem";
import PlaylistTabItem from "./PlaylistTabItem";

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
    <div
      className={`${className} flex flex-col gap-4 overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[368px] transition-right ease-in-out duration-300`}
      onClick={(e) => e.stopPropagation()}
    >
      {data.map((item) => (
        <PlaylistTabItem
          videoName={item.videoName}
          imageURL={item.imageURL}
          link={item.link}
        />
      ))}
    </div>
  );
};

const VideoFileTab: React.FC<VideoFileTabProps> = ({ data, className }) => {
  return (
    <div
      className={`${className} flex flex-col gap-4 overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[348px] transition-right ease-in-out duration-300`}
      onClick={(e) => e.stopPropagation()}
    >
      {data.map((item) => (
        <FileTabItem fileName={item.fileName} fileUrl={item.fileUrl} />
      ))}
    </div>
  );
};

export default { VideoPlaylistTab, VideoFileTab };
