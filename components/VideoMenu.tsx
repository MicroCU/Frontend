import { ListVideo, File } from "lucide-react";
import { useState } from "react";

interface VideoMenuProps {
  menuRef: React.MutableRefObject<HTMLDivElement | null>;
  playing: boolean;
}

const VideoMenu: React.FC<VideoMenuProps> = ({ menuRef, playing }) => {
  const [isVideoListOpen, setIsVideoListOpen] = useState(false);
  const [isFileListOpen, setIsFileListOpen] = useState(false);
  return (
    <div
      ref={menuRef}
      className="bg-black bg-opacity-40 absolute top-16 right-0 flex flex-col z-10 justify-between p-4 rounded-l"
    >
      <div className="flex items-center justify-end gap-7 mr-5">
        <button type="button" className="ListVideo-button">
          <ListVideo
            className={`cursor-pointer ${
              isVideoListOpen ? "text-primary" : "text-white"
            }`}
            strokeWidth={3}
            onClick={() => {
              setIsVideoListOpen(!isVideoListOpen);
              setIsFileListOpen(false);
            }}
          />
        </button>
        <button type="button" className="File-button">
          <File
            className={`cursor-pointer ${
              isFileListOpen ? "text-primary" : "text-white"
            }`}
            strokeWidth={3}
            onClick={() => {
              setIsFileListOpen(!isFileListOpen);
              setIsVideoListOpen(false);
            }}
          />
        </button>
      </div>
      <div
        className={`${
          isVideoListOpen && !playing
            ? "fixed top-32 bottom-16 right-0 bg-white rounded-l-[10px] p-5 w-[300px] transition-right ease-in-out duration-300"
            : "fixed top-32 bottom-16 right-[-400px] bg-white rounded-l-[10px] p-5 w-[300px] transition-right ease-in-out duration-300"
        }`}
      >
        Video
      </div>
      <div
        className={`${
          isFileListOpen && !playing
            ? "fixed top-32 bottom-16 right-0 bg-white rounded-l-[10px] p-5 w-[300px] transition-right ease-in-out duration-300"
            : "fixed top-32 bottom-16 right-[-400px] bg-white rounded-l-[10px] p-5 w-[300px] transition-right ease-in-out duration-300"
        }`}
      >
        File
      </div>
    </div>
  );
};

export default VideoMenu;
