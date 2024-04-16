"use client"
import { usePathname, useRouter } from "next/navigation";

interface PlaylistTabItemProps {
  id: string;
  name: string;
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({
  id,
  name,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoute = () => {
    const pathSegments = pathName.split("/");
    const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/video/${id}`;
    router.push(desiredPathUrl);
  }
  return (
    <div className="flex  gap-4 cursor-pointer" onClick={handleRoute}>
      <div className="bg-primary min-w-[150px] h-[90px]">
        <img
          src="/defaultVideoImage.svg"
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full Bold16 flex items-center">
        <p>{name}</p>
      </div>
    </div>
  );
};

export default PlaylistTabItem;
