"use client";
import { useJourney } from "@/context/Journeys";
import PathItems from "./PathItems";
import { getPathDetailFromId } from "@/mock/common";
import NoResult from "./NoResult";

export default function PathList() {
  const { journeys, selectedPath, setSelectedPath, selectedTab } = useJourney();
  if (
    journeys &&
    journeys.data.length > 0 &&
    journeys.data[0].paths.data.length === 0
  ) {
    return (
      <div className="flex-1 flex flex-col justify-center mt-6">
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
