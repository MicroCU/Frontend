interface PlaylistTabItemProps {
    name: string
    image: string
    link: string
}

const PlaylistTabItem: React.FC<PlaylistTabItemProps> = ({name,image,link}) => {
    return (
        <div className="flex w-[320px] gap-4 cursor-pointer">
          <div className="bg-primary min-w-[150px] h-[90px]">
          <img src={image} alt="Video Thumbnail" className="w-full h-full object-cover" />
          </div>
          <div className="w-full Bold16 flex items-center">
            <p>{name}</p>
          </div>
        </div>
      );
}

export default PlaylistTabItem