"use client";
import NavBar from "@/components/NavBar";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import { BriefPathInfo } from "@/types/type";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { CheckListItemStatus } from "@/types/enum";
import { ICheckListItem } from "@/components/CheckListItem";

const mockCheckListItems: ICheckListItem[] = [
  {
    journey: "Journey 1",
    paths: ["Path 1", "Path 2", "Path 3"],
    progress: 60
  },
  {
    journey: "Journey 2",
    paths: ["Path 1", "Path 2", "Path 3"],
    progress: 40
  },
  {
    journey: "Journey 3",
    paths: ["Path 1", "Path 2", "Path 3"],
    progress: 5
  }
];

const GraphPage = () => {
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  const [isViewCheckList, setIsViewCheckList] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen bg-grayLight">
      <div className="z-50">
        <NavBar />
      </div>
      <div className="flex items-center z-30 w-full">
        <ReactFlowProvider>
          <OverviewFlow setSelectedPath={setSelectedPath} />
        </ReactFlowProvider>
      </div>
      {selectedPath && (
        <div className="absolute top-20 right-20 z-40">
          <SelectedPathModal
            title={selectedPath.title}
            description={selectedPath.description}
            tags={selectedPath.tags}
          />
        </div>
      )}
      <div
        className="absolute top-5 right-5 z-40"
        onClick={() => {
          setIsViewCheckList(!isViewCheckList);
        }}
      >
        {isViewCheckList ? (
          <CheckList
            checkListItems={mockCheckListItems}
            status={CheckListItemStatus.SHOWN}
          />
        ) : (
          <CheckListIcon />
        )}
      </div>
    </div>
  );
};

export default GraphPage;
