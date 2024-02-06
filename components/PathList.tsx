"use client";
import { useJourney } from "@/context/Journeys";
import PathItems from "./PathItems";
import { getPathDetailFromId } from "@/mock/common";
import NoResult from "./NoResult";
import ListItemsLoading from "./ListLoading";
import { MenuTab } from "@/types/enum";
import { useEffect, useState } from "react";
import { checkIsDataFieldsValid } from "@/lib/utils";

export default function PathList() {
  const {
    journeys,
    selectedPath,
    setSelectedPath,
    selectedTab,
    searchKeyword
  } = useJourney();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(
      (!journeys && selectedTab != MenuTab.search) ||
        (!journeys && selectedTab == MenuTab.search && searchKeyword != "")
    );
  }, [journeys, searchKeyword, selectedTab]);
  if (isLoading)
    return (
      <div className="flex flex-col gap-y-6">
        <ListItemsLoading />
      </div>
    );

  const dynamicHeight =
    selectedTab === MenuTab.search
      ? "calc(100vh - 280px)"
      : "calc(100vh - 220px)";

  if (
    checkIsDataFieldsValid(journeys) &&
    journeys!.data[0].paths.data.length === 0
  ) {
    return (
      <div style={{ height: dynamicHeight }}>
        <NoResult type={selectedTab} />{" "}
      </div>
    );
  }

  return (
    <div>
      {checkIsDataFieldsValid(journeys) &&
        journeys!.data[0].paths.data.map((path) => (
          <div
            className="pb-2"
            key={path.id}
            onClick={() => {
              setSelectedPath(getPathDetailFromId(path.id, journeys));
            }}
          >
            <PathItems
              name={path.name}
              isSelected={selectedPath?.id === path.id}
            />
          </div>
        ))}
    </div>
  );
}
