import { Button } from "./ui/button";

interface VideoNextProps {
  nextRef: React.MutableRefObject<HTMLDivElement | null>;
  playing: boolean;
}

const VideoNext: React.FC<VideoNextProps> = ({nextRef,playing}) => {
  return (
    <div ref={nextRef} className="absolute bottom-28 flex gap-10">
      <Button className="bg-white w-[530px] py-6 Bold24">Next1</Button>
      <Button className="bg-white w-[530px] py-6 Bold24">Next2</Button>
    </div>
  );
};

export default VideoNext;
