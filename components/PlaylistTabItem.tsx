"use client"
import { usePathname, useRouter } from "next/navigation";

interface PlaylistTabItemProps {
  videoName: string;
  imageURL: string;
  videoId: string;
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({
  videoName,
  imageURL,
  videoId,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoute = () => {
    const pathSegments = pathName.split("/");
    const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/video/${videoId}`;
    router.push(desiredPathUrl);
  }
  return (
    <div className="flex  gap-4 cursor-pointer" onClick={handleRoute}>
      <div className="bg-primary min-w-[150px] h-[90px]">
        <img
          src={imageURL ? imageURL : "/defaultVideoImage.svg"}
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
