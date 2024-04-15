import VideoNav from "./VideoNav";
import { MutableRefObject, useEffect, useState } from "react";
import VideoController from "./VideoController";
import LoadingSpinner from "./LoadingSpinner";
import { VideoState } from "@/app/[lang]/path/[id]/video/[vid]/page";
import VideoTab from "./VideoTab";
import VideoChoice from "./VideoChoice";
import { cn } from "@/lib/utils";
import { VideoTabType } from "@/types/enum";

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
      imageURL:
        "https://static.javatpoint.com/definition/images/computer-definition.png",
      videoId: "1"
    },
    {
      videoName: "example",
      imageURL:
        "https://static.javatpoint.com/definition/images/computer-definition.png",
      videoId: "2"
    },
    {
      videoName: "example",
      imageURL: "",
      videoId: "3"
    },
    {
      videoName: "example",
      imageURL: "",
      videoId: "4"
    },
    {
      videoName: "example",
      imageURL: "",
      videoId: "5"
    },
    {
      videoName: "example",
      imageURL: "",
      videoId: "6"
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
      choiceName: "choice1",
      videoName: "example",
      videoId: "2"
    },
    {
      choiceName: "choice2",
      videoName: "example",
      videoId: "2"
    },
    {
      choiceName: null,
      videoName: "example",
      videoId: "2"
    }
  ];

  const [currentVideoTab, setCurrentVideoTab] = useState<VideoTabType>(
    VideoTabType.HIDE
  );

  const videoTabHandle = (currentTab: VideoTabType) => {
    if (currentTab === currentVideoTab) {
      setCurrentVideoTab(VideoTabType.HIDE);
    } else {
      setCurrentVideoTab(currentTab);
    }
  };

  return (
    <div
      ref={controlRef}
      style={{ visibility: "visible" }}
      className="absolute top-0 left-0 flex-col z-10 flex justify-between w-full h-full"
    >
      <VideoNav
        videoName={videoName}
        currentTab={currentVideoTab}
        videoTabHandle={videoTabHandle}
        isFile={fileData ? true : false}
        isPlaylist={platlistData ? true : false}
        className="bg-gradient-to-b from-black"
      />
      <div
        className="h-full overflow-hidden flex justify-center items-center relative"
        onClick={onPlayPause}
      >
        {videoState.buffer && videoState.playing && <LoadingSpinner />}
        <VideoTab.VideoPlaylistTab
          data={platlistData}
          className={cn(
            "top-0 h-[97%]",
            currentVideoTab == VideoTabType.PLAYLIST && !isHidden
              ? "right-0"
              : "right-[-400px]"
          )}
        />
        {fileData && (
          <VideoTab.VideoFileTab
            data={fileData}
            className={cn(
              "top-0 h-[97%]",
              currentVideoTab == VideoTabType.FILE && !isHidden
                ? "right-0"
                : "right-[-400px]"
            )}
          />
        )}

        {videoState.ended && choiceData && (
          <div className="absolute bottom-16 w-full flex justify-center gap-10 px-20">
            {choiceData.map((item) => (
              <VideoChoice
                choiceName={item.choiceName}
                videoName={item.videoName}
                videoId={item.videoId}
                key={item.videoName}
              />
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
