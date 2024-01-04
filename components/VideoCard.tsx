const VideoCard = () => {
  return (
    <div className="flex w-full gap-4 cursor-pointer">
      <div className="bg-primary min-w-[150px] h-[90px]">
      <img src="https://m.media-amazon.com/images/I/41wsWJ5hHkL.png" alt="Video Thumbnail" className="w-full h-full object-cover" />
      </div>
      <div className="w-full Bold16 flex items-center">
        <p>video name</p>
      </div>
    </div>
  );
};

export default VideoCard;
