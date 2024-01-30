import VideoNav from "./VideoNav";
import { MutableRefObject, useEffect, useState } from "react";
import VideoController from "./VideoController";
import LoadingSpinner from "./LoadingSpinner";
import { VideoState } from "@/app/[lang]/video/[id]/page";
import VideoTab from "./VideoTab";
import VideoChoice from "./VideoChoice";

interface VideoControlLayerProps {
  videoName: string;
  onPlayPause: () => void;
  onSeek: (value: number[]) => void;
  onSeekMouseUp: (value: number[]) => void;
  onVolumeChangeHandler: (value: number[]) => void;
  onVolumeSeekUp: (value: number[]) => void;
  onMute: () => void;
  duration: string;
  currentTime: string;
  controlRef: MutableRefObject<HTMLDivElement | null>;
  fullscreenHandler: () => void;
  isFullScreen: boolean;
  speedHandler: (value: string) => void;
  isHidden: boolean;
  videoState: VideoState;
}

const VideoControlLayer = ({
  videoName,
  onPlayPause,
  onSeek,
  onSeekMouseUp,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  onMute,
  duration,
  currentTime,
  controlRef,
  fullscreenHandler,
  isFullScreen,
  speedHandler,
  isHidden,
  videoState
}: VideoControlLayerProps) => {
  const platlistData = [
    {
      videoName: "example",
      imageURL: "https://static.javatpoint.com/definition/images/computer-definition.png",
      link: "/go"
    },
    {
      videoName: "example",
      imageURL: "https://static.javatpoint.com/definition/images/computer-definition.png",
      link: "/go"
    },
    {
      videoName: "example",
      imageURL: "",
      link: "/go"
    },
    {
      videoName: "example",
      imageURL: "",
      link: "/go"
    },
    {
      videoName: "example",
      imageURL: "",
      link: "/go"
    },
    {
      videoName: "example",
      imageURL: "",
      link: "/go"
    }
  ];

  const fileData = [
    {
      fileName: "example",
      fileUrl: "https://filesamples.com/samples/code/c/sample3.c"
    }
  ];

  const choiceData = [
    {
      videoName: "example",
      link: "/video/2"
    },
    {
      videoName: "example",
      link: "/go"
    },
    {
      videoName: "example",
      link: "/go"
    },
    {
      videoName: "example",
      link: "/go"
    }
  ];

  const [isPlaylistSelected, setIsPlaylistSelected] = useState<boolean>(false);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);

  useEffect(() => {
    if (isPlaylistSelected) {
      setIsFileSelected(false);
    }
  }, [isPlaylistSelected]);

  useEffect(() => {
    if (isFileSelected) {
      setIsPlaylistSelected(false);
    }
  }, [isFileSelected]);

  return (
    <div
      ref={controlRef}
      style={{ visibility: "visible" }}
      className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full"
    >
      <VideoNav
        videoName={videoName}
        isPlaylistSelected={isPlaylistSelected}
        setIsPlaylistSelected={setIsPlaylistSelected}
        isFileSelected={isFileSelected}
        setIsFileSelected={setIsFileSelected}
        className="bg-gradient-to-b from-black"
      />
      <div
        className="h-full overflow-hidden flex justify-center items-center relative"
        onClick={onPlayPause}
      >
        {videoState.buffer && videoState.playing && <LoadingSpinner />}
        <VideoTab.VideoPlaylistTab
          data={platlistData}
          className={`top-0 ${
            isPlaylistSelected && !isHidden ? "right-0" : "right-[-400px]"
          } h-[97%]`}
        />
        <VideoTab.VideoFileTab
          data={fileData}
          className={`absolute top-0 ${
            isFileSelected && !isHidden ? "right-0" : "right-[-400px]"
          } h-[97%]`}
        />
        {videoState.ended && (
          <div className="absolute bottom-16 w-full flex justify-center gap-10 px-20">
            {choiceData.map((item) => (
              <VideoChoice videoName={item.videoName} link={item.link} />
            ))}
          </div>
        )}
      </div>
      <VideoController
        className="bg-gradient-to-t from-black"
        onPlayPause={onPlayPause}
        onSeek={onSeek}
        onSeekMouseUp={onSeekMouseUp}
        onVolumeChangeHandler={onVolumeChangeHandler}
        onVolumeSeekUp={onVolumeSeekUp}
        onMute={onMute}
        duration={duration}
        currentTime={currentTime}
        fullscreenHandler={fullscreenHandler}
        isFullScreen={isFullScreen}
        speedHandler={speedHandler}
        videoState={videoState}
      />
    </div>
  );
};

export default VideoControlLayer;
