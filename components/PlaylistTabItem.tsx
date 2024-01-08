"use client"
import { useRouter } from "next/navigation";

interface PlaylistTabItemProps {
  videoName: string;
  imageURL: string;
  link: string;
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({
  videoName,
  imageURL,
  link,
}) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(link);
  }
  return (
    <div className="flex w-[320px] gap-4 cursor-pointer" onClick={handleRoute}>
      <div className="bg-primary min-w-[150px] h-[90px]">
        <img
          src={imageURL}
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full Bold16 flex items-center">
        <p>{videoName}</p>
      </div>
    </div>
  );
};

export default PlaylistTabItem;
