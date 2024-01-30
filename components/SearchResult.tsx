"use client";
import { useJourney } from "@/context/Journeys";
import PathItems from "./PathItems";
import { useSelectedPath } from "@/context/SelectedPath";
import { getPathDetailFromId } from "@/mock/common";
import { MenuTab } from "@/types/enum";

export default function SearchResult() {
  const { journeys } = useJourney();
  const { selectedPath, setSelectedPath } = useSelectedPath();
  return (
    <div className="pt-3">
      {journeys &&
        journeys.length > 0 &&
        journeys[0].paths.data.map((path) => (
          <div
            key={path.id}
            onClick={() => {
              setSelectedPath(getPathDetailFromId(path.id, MenuTab.search));
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
