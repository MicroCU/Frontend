import React, { useState, useEffect } from "react";

import { PlaybackStatuses } from "./kaltura-player-context";
import { usePlayer } from "./use-player";
import { usePlayerUpdates } from "./use-player-updates";
import { KalturaPlayer } from "./kaltura-player";
import { MicroData } from "@/types/type";
import { usePath } from "@/context/Path";
import VideoTab from "../VideoTab";
import { cn } from "@/lib/utils";
import { VideoTabType } from "@/types/enum";
import VideoNav from "../VideoNav";

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

  const [entryId, setEntryId] = useState(entriesConfig.entryId);
  const [playerId, setPlayerId] = useState("");
  const [playerState, setPlayerState] = useState<PlaybackStatuses | null>(null);
  const [playerTime, setPlayerTime] = useState<number | null>(null);

  const { playerPlay, playerPause, playerSeek, getPlayerInstance } =
    usePlayer(playerId);
  const { getPlayerState, getPlayerTime, playerState$, playerTime$ } =
    usePlayerUpdates(playerId);

  const { pathInfo } = usePath();
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

  useEffect(() => {
    if (!playerId) {
      return;
    }

    const stateSubscription = playerState$.subscribe(
      (result: React.SetStateAction<PlaybackStatuses | null>) => {
        setPlayerState(result);
      }
    );

    const timeSubscription = playerTime$.subscribe(
      (result: React.SetStateAction<number | null>) => {
        setPlayerTime(result);
      }
    );

    return () => {
      stateSubscription.unsubscribe();
      timeSubscription.unsubscribe();
    };
  }, [playerId, playerState$, playerTime$]);

  const handleTogglePlay = () => {
    if (getPlayerState() === PlaybackStatuses.Playing) {
      playerPause();
      return;
    }

    if (getPlayerState() === PlaybackStatuses.Paused) {
      playerPlay();
      return;
    }
  };

  const handleToggleMute = () => {
    const playerInstance = getPlayerInstance();

    if (!playerInstance) {
      return;
    }

    playerInstance.muted = !playerInstance.muted;
  };

  const handleSeek = (pause: boolean) => {
    const newTime = getPlayerTime() - 5000;
    playerSeek({ seekTo: newTime, pause });
  };

  const handlePlayerLoaded = (data: { playerId: string }) => {
    const { playerId } = data;

    if (!playerId) {
      return;
    }

    setPlayerId(playerId);
  };

  const handleSwitchMedia = () => {
    if (entriesConfig.alternateEntryId && entryId === entriesConfig.entryId) {
      setEntryId(entriesConfig.alternateEntryId);
      return;
    }

    setEntryId(entriesConfig.entryId);
  };

  const customizeConfig = (config: any) => {
    // DEVELOPER NOTICE - this is an optional method that lets you
    // customize the plaer config during loading.
    // if you don't need to customize, just remove it, just remove it

    const tooltip = "I'm such a cool yellow button, added by the application";
    // @ts-ignore
    const h = window.KalturaPlayer.ui.preact.h;
    const customButton = h("div", {
      title: tooltip,
      onClick: () => {
        handleToggleMute();
      },
      style: { marginTop: 10, width: 30, height: 30, background: "yellow" }
    });

    const newConfig = {
      ...config,
      ui: {
        ...(config.ui || {}),
        uiComponents: [
          ...((config.ui || {}).uiComponents || []),
          {
            label: "add custom",
            presets: ["Playback"],
            container: "TopBarRightControls",
            get: () => customButton
          }
        ]
      }
    };
    return newConfig;
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

    // Attach event listener for mouse move
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="h-screen w-full absolute top-0 left-0 overflow-hidden">
        {/* <div
          className="absolute right-0 z-10 text-white"
          onClick={() => videoTabHandle(VideoTabType.PLAYLIST)}
        >
          Playlist
        </div> */}
        <VideoNav
          videoName={"videoName"}
          currentTab={currentVideoTab}
          videoTabHandle={videoTabHandle}
          isFile={fileData ? true : false}
          isPlaylist={playlistData ? true : false}
          className={`bg-gradient-to-b from-black absolute z-10 ${
            getPlayerState() === PlaybackStatuses.Paused
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
        <KalturaPlayer
          entryId={entryId}
          // customizeConfig={customizeConfig}
          autoplay={false}
          onPlayerLoaded={handlePlayerLoaded}
        />
      </div>
    </div>
  );
}
