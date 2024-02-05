"use client";
import { useJourney } from "@/context/Journeys";
import PathItems from "./PathItems";
import { getPathDetailFromId } from "@/mock/common";
import NoResult from "./NoResult";
import ListItemsLoading from "./ListLoading";
import { Menu } from "lucide-react";
import { MenuTab } from "@/types/enum";

export default function PathList() {
  const {
    journeys,
    selectedPath,
    setSelectedPath,
    selectedTab,
    searchKeyword
  } = useJourney();
  if (
    (!journeys && selectedTab != MenuTab.search) ||
    (!journeys && selectedTab == MenuTab.search && searchKeyword != "")
  )
    return (
      <div className="flex flex-col gap-y-6 mt-6">
        <ListItemsLoading />
      </div>
    );
  if (
    journeys &&
    journeys.data.length > 0 &&
    journeys.data[0].paths.data.length === 0
  ) {
    return (
      <div className="flex-1 flex flex-col justify-center">
        <NoResult type={selectedTab} />{" "}
      </div>
    );
  }
  return (
    <div className="mt-6">
      {journeys &&
        journeys.data.length > 0 &&
        journeys.data[0].paths.data.map((path) => (
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
