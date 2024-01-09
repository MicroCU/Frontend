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
}

interface VideoFileTabProps {
  data: FileItem[];
}

const VideoPlaylistTab: React.FC<VideoPlaylistTabProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[348px] h-[78vh] max-h-[78vh]">
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

const VideoFileTab: React.FC<VideoFileTabProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 overflow-auto bg-white rounded-l-[10px] py-4 px-6 w-[348px] h-[78vh] max-h-[78vh]">
      {data.map((item) => (
        <FileTabItem fileName={item.fileName} fileUrl={item.fileUrl} />
      ))}
    </div>
  );
};

export default {VideoPlaylistTab, VideoFileTab};
