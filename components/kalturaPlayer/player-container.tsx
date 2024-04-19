import React, { useState, useEffect } from "react";

import { PlaybackStatuses } from "./kaltura-player-context";
import { usePlayer } from "./use-player";
import { usePlayerUpdates } from "./use-player-updates";
import { KalturaPlayer } from "./kaltura-player";

export interface EntriesConfig {
  entryId: string;
  alternateEntryId?: string;
}

export interface PlayerContainerProps {
  entriesConfig: EntriesConfig;
}

export function PlayerContainer(props: PlayerContainerProps) {
  const { entriesConfig } = props;

  const [entryId, setEntryId] = useState(entriesConfig.entryId);
  const [playerId, setPlayerId] = useState("");
  const [playerState, setPlayerState] = useState<PlaybackStatuses | null>(null);
  const [playerTime, setPlayerTime] = useState<number | null>(null);

  const { playerPlay, playerPause, playerSeek, getPlayerInstance } = usePlayer(
    playerId
  );
  const {
    getPlayerState,
    getPlayerTime,
    playerState$,
    playerTime$
  } = usePlayerUpdates(playerId);

  console.log(playerState$);
  

  useEffect(() => {
    if (!playerId) {
      return;
    }

    const stateSubscription = playerState$.subscribe((result: React.SetStateAction<PlaybackStatuses | null>) => {
      setPlayerState(result);
    });

    const timeSubscription = playerTime$.subscribe((result: React.SetStateAction<number | null>) => {
      setPlayerTime(result);
    });

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
        alert(tooltip);
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

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <KalturaPlayer
          entryId={entryId}
          customizeConfig={customizeConfig}
          autoplay={false}
          onPlayerLoaded={handlePlayerLoaded}
        />
      </div>
    </div>
  );
}
