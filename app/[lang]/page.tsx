"use client";
import NavBar from "@/components/NavBar";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import { JourneyData } from "@/types/type";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { CheckListItemStatus } from "@/types/enum";
import { ICheckListItem } from "@/components/CheckListItem";
import { MockHomeData } from "@/mock/home_data";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import { JourneyItem } from "@/components/JourneyItems";
import { useSelectedPath } from "@/context/SelectedPath";

const GraphPage = () => {
  const mockJourneyData = MockHomeData;
  const { selectedPath } = useSelectedPath();
  const [isViewCheckList, setIsViewCheckList] = useState<boolean>(false);
  const { initialNodes, initialEdges } =
    generateInitialNodeEdge(mockJourneyData);
  return (
    <div className="flex min-h-screen bg-grayLight">
      <div className="z-50">
        <NavBar
          journeys={transformDataToNavBarData(mockJourneyData.journeys)}
        />
      </div>
      <div className="flex items-center z-30 w-full">
        <ReactFlowProvider>
          <OverviewFlow
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </ReactFlowProvider>
      </div>
      {selectedPath && (
        <div className="absolute top-20 right-20 z-40">
          <SelectedPathModal />
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
            checkListItems={transformDataToCheckListData(
              mockJourneyData.journeys
            )}
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
    const paths = journeyData.paths.data.map((path) => path.name);
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
    const paths = journeyData.paths.data.map((path) => {
      return {
        id: path.id,
        name: path.name
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
