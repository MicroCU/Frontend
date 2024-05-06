"use client";
import { MicroType } from "@/types/enum";
import { usePathname, useRouter } from "next/navigation";
import I18nTypo from "./ui/I18nTypo";

interface PlaylistTabItemProps {
  id: string;
  name: string;
  type: MicroType;
  testLink: string;
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({
  id,
  name,
  type,
  testLink
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoute = () => {
    if (type === MicroType.Video) {
      const pathSegments = pathName.split("/");
      const desiredPathUrl = `/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/video/${id}`;
      router.push(desiredPathUrl);
    } else {
      window.open(testLink, '_blank');
    }
  };
  return (
    <div className="flex  gap-4 cursor-pointer" onClick={handleRoute}>
      <div className="bg-primary min-w-[150px] h-[90px]">
        <img
          src={
            type === MicroType.Video
              ? "/defaultVideoImage.svg"
              : "/defaultTestImage.svg"
          }
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full Bold16 flex items-center">
        <p>
          <I18nTypo>{name}</I18nTypo>
        </p>
      </div>
    </div>
  );
};

export default PlaylistTabItem;
