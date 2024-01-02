import { Button } from "./ui/button";

interface VideoNextProps {
  nextRef: React.MutableRefObject<HTMLDivElement | null>;
  playing: boolean;
}

const VideoNext: React.FC<VideoNextProps> = ({nextRef,playing}) => {
  return (
    <div ref={nextRef} className="absolute bottom-28 flex gap-10">
      <Button className="bg-white w-96 py-6">Next1</Button>
      <Button className="bg-white w-96 py-6">Next2</Button>
    </div>
  );
};

export default VideoNext;
