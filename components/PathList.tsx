"use client";
import { useJourneyGraph } from "@/context/JourneysGraph";
import PathItems from "./PathItems";
import { getPathDetailFromId } from "@/mock/common";

export default function PathList() {
  const { journeys, selectedPath, setSelectedPath } = useJourneyGraph();
  return (
    <div>
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
