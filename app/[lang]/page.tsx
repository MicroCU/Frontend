"use client";
import NavBar from "@/components/NavBar";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import { BriefPathInfo, JourneyData } from "@/types/type";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { CheckListItemStatus } from "@/types/enum";
import { ICheckListItem } from "@/components/CheckListItem";
import { MockHomeData } from "@/mock/home_data";
import { generateNode, mockEdges } from "@/lib/undirected-nodes-edges";
import { JourneyItem } from "@/components/JourneyItems";

const GraphPage = () => {
  const mockJourneyData = MockHomeData;
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  const [isViewCheckList, setIsViewCheckList] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen bg-grayLight">
      <div className="z-50">
        <NavBar journeys={transformDataToNavBarData(mockJourneyData)} />
      </div>
      <div className="flex items-center z-30 w-full">
        <ReactFlowProvider>
          <OverviewFlow
            setSelectedPath={setSelectedPath}
            initialNodes={generateNode(mockJourneyData)}
            initialEdges={mockEdges}
          />
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
            checkListItems={transformDataToCheckListData(mockJourneyData)}
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

function transformDataToCheckListData(mockJourneyData: JourneyData[]) {
  const checkListItems: ICheckListItem[] = [];
  mockJourneyData.forEach((journeyData) => {
    const paths = journeyData.paths.map((path) => path.title);
    const progress = journeyData.progress;
    checkListItems.push({
      journey: journeyData.name,
      paths,
      progress
    });
  });
  return checkListItems;
}

function transformDataToNavBarData(mockJourneyData: JourneyData[]) {
  const navBarData: JourneyItem[] = [];
  mockJourneyData.forEach((journeyData) => {
    const paths = journeyData.paths.map((path) => {
      return {
        id: path.id,
        name: path.title
      };
    });
    navBarData.push({
      id: journeyData.id,
      name: journeyData.name,
      paths: paths
    });
  });
  return navBarData;
}
