"use client";
import { useJourney } from "@/context/Journeys";
import PathItems from "./PathItems";
import { getPathDetailFromId } from "@/mock/common";
import { MenuTab } from "@/types/enum";

export default function PathList({ resultType }: { resultType: MenuTab }) {
  const { journeys, selectedPath, setSelectedPath } = useJourney();
  return (
    <div className="pt-3">
      {journeys &&
        journeys.data.length > 0 &&
        journeys.data[0].paths.data.map((path) => (
          <div
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
