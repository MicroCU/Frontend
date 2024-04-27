import React, { useState, useEffect } from "react";

import { PlaybackStatuses } from "./kaltura-player-context";
import { usePlayer } from "./use-player";
import { usePlayerUpdates } from "./use-player-updates";
import { KalturaPlayer } from "./kaltura-player";
import { MicroData } from "@/types/type";
import { usePath } from "@/context/Path";
import VideoTab from "../VideoTab";
import { cn } from "@/lib/utils";
import { VideoTabType, VideoType } from "@/types/enum";
import VideoNav from "../VideoNav";
import { getNextMicro, getPathInitialNodesAndEdges } from "@/utils/path";
import VideoChoice from "../VideoChoice";
import { updateVideoProgress } from "@/action/video";

export interface EntriesConfig {
  entryId: string;
  alternateEntryId?: string;
}

export interface PlayerContainerProps {
  entriesConfig: EntriesConfig;
  microData: MicroData;
}

export function PlayerContainer(props: PlayerContainerProps) {
  const { entriesConfig, microData } = props;

  const entryId = entriesConfig.entryId;
  const [playerId, setPlayerId] = useState("");

  const { getPlayerInstance } = usePlayer(playerId);
  const { getPlayerState, getPlayerTime } = usePlayerUpdates(playerId);

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
  const fileData = microData.documents;
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

  const handlePlayerLoaded = (data: { playerId: string }) => {
    const { playerId } = data;

    if (!playerId) {
      return;
    }

    setPlayerId(playerId);
  };

  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);

  useEffect(() => {
    const playerInstance = getPlayerInstance();
    if (playerInstance) {
      const currentTime = getPlayerTime() / 1000;
      const duration = Math.floor(playerInstance.duration * 1000) / 1000;
      if (currentTime >= duration) {
        setIsVideoEnded(true);
      } else {
        setIsVideoEnded(false);
      }
    }
  }, [getPlayerTime()]);

  useEffect(() => {
    const handleUpdateVideoProgress = async () => {
      const totalTick = Math.min(playerInstance.duration, 400);
      const secondToUpdate =
        totalTick < 400 ? 1 : playerInstance.duration / totalTick;
      const currentTime = getPlayerTime() / 1000;
      const tick = Math.floor(currentTime / secondToUpdate);
      if (
        currentTime >= secondToUpdate * tick &&
        currentTime < secondToUpdate * tick + 1
      ) {
        try {
          const res = await updateVideoProgress(
            entryId,
            pathInfo?.id || "",
            VideoType.Kaltura,
            totalTick,
            Array.from({ length: tick }, (_, i) => i)
          );
        } catch (e) {
          console.log(e);
        }
      }
    };
    const playerInstance = getPlayerInstance();
    if (playerInstance) {
      handleUpdateVideoProgress();
    }
  }, [getPlayerTime()]);

  const handleFullScreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const [cursorMoved, setCursorMoved] = useState<boolean>(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setCursorMoved(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCursorMoved(false);
      }, 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full absolute top-0 left-0 overflow-hidden">
        <VideoNav
          videoName={microData.video?.title || ""}
          currentTab={currentVideoTab}
          videoTabHandle={videoTabHandle}
          isFile={fileData ? true : false}
          isPlaylist={playlistData ? true : false}
          className={`bg-gradient-to-b from-black absolute z-10 ${
            getPlayerState() === PlaybackStatuses.Paused ||
            getPlayerState() === PlaybackStatuses.Idle
              ? "visible"
              : cursorMoved
              ? "visible"
              : "hidden"
          }`}
        />
        {playlistData && (
          <VideoTab.VideoPlaylistTab
            data={playlistData}
            className={cn(
              "top-24 h-[81%] z-20",
              currentVideoTab == VideoTabType.PLAYLIST && cursorMoved
                ? "right-0"
                : "right-[-400px]"
            )}
          />
        )}
        {fileData && (
          <VideoTab.VideoFileTab
            data={fileData}
            className={cn(
              "top-24 h-[81%] z-20",
              currentVideoTab == VideoTabType.FILE && cursorMoved
                ? "right-0"
                : "right-[-400px]"
            )}
          />
        )}
        {isVideoEnded && choiceData && (
          <div className="absolute bottom-20 w-full flex justify-center gap-10 px-20 z-20">
            {choiceData.map((item) => (
              <VideoChoice
                choiceName={item.video?.decisionTitle || "Go to " + item.name}
                microId={item.id}
                microType={item.type}
                testLink={item.test?.link || ""}
                key={"choice" + item.id}
              />
            ))}
          </div>
        )}
        <div
          className="absolute right-2 bottom-0 w-12 h-10 z-20 cursor-pointer"
          onClick={handleFullScreenToggle}
        ></div>
        <KalturaPlayer
          entryId={entryId}
          autoplay={false}
          onPlayerLoaded={handlePlayerLoaded}
        />
      </div>
    </div>
  );
}
