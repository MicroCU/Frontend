import VideoNav from "./VideoNav";
import { MutableRefObject, useEffect, useState } from "react";
import VideoController from "./VideoController";
import LoadingSpinner from "./LoadingSpinner";
import { VideoState } from "@/app/[lang]/path/[id]/video/[vid]/page";
import VideoTab from "./VideoTab";
import VideoChoice from "./VideoChoice";
import { cn } from "@/lib/utils";
import { VideoTabType } from "@/types/enum";
import { DocumentData, MicroData } from "@/types/type";
import { usePath } from "@/context/Path";
import { getNextMicro, getPathInitialNodesAndEdges } from "@/utils/path";
import { useTranslation } from "@/context/Translation";

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
  microData: MicroData;
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
  videoState,
  microData
}: VideoControlLayerProps) => {
  const { dict } = useTranslation();
  const { pathInfo } = usePath();
  const { initialNodes, initialEdges } = getPathInitialNodesAndEdges(
    pathInfo?.groups || []
  );

  const playlistData = pathInfo?.groups
    .flatMap((group) => group.micros)
    .filter((micro) => micro.id !== microData.id)
    .map(({ id, name, type, test }) => ({
      id,
      name,
      type,
      link: test?.link || ""
    }));
  const fileData = microData.documents
    ? filterEmptyFile(microData.documents)
    : [];
  const choiceData = getNextMicro(microData.id, initialNodes, initialEdges);

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
        isFile={fileData && fileData.length > 0 ? true : false}
        isPlaylist={playlistData ? true : false}
        className="bg-gradient-to-b from-black"
      />
      <div
        className="h-full overflow-hidden flex justify-center items-center relative"
        onClick={onPlayPause}
      >
        {videoState.buffer && videoState.playing && <LoadingSpinner />}
        {playlistData && (
          <VideoTab.VideoPlaylistTab
            data={playlistData}
            className={cn(
              "top-0 h-[97%] z-20",
              currentVideoTab == VideoTabType.PLAYLIST && !isHidden
                ? "right-0"
                : "right-[-400px]"
            )}
          />
        )}

        {fileData && fileData.length > 0 && (
          <VideoTab.VideoFileTab
            data={fileData}
            className={cn(
              "top-0 h-[97%] z-20",
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
                choiceName={
                  item.video?.decisionTitle ||
                  dict["micro.videoChoice.goto"] + " " + item.name
                }
                microId={item.id}
                microType={item.type}
                testLink={item.test?.link || ""}
                key={"choice" + item.id}
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

const filterEmptyFile = (fileData: DocumentData[]) => {
  return fileData.filter((obj) => Object.keys(obj).length !== 0);
};
