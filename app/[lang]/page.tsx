"use client";
import NavBar from "@/components/NavBar";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";
import { useEffect, useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { CheckListItemStatus } from "@/types/enum";
import { MockHomeData } from "@/mock/home_data";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import { SelectedPathContextProvider } from "@/context/SelectedPath";
import { useJourney } from "@/context/Journeys";

const Home = () => {
  const mockJourneyData = MockHomeData;
  const { setJourneys } = useJourney();
  useEffect(() => {
    setJourneys(mockJourneyData.journeys);
  }, [mockJourneyData.journeys]);

  const [isViewCheckList, setIsViewCheckList] = useState<boolean>(false);
  const { initialNodes, initialEdges } =
    generateInitialNodeEdge(mockJourneyData);
  return (
    <SelectedPathContextProvider>
      <div className="flex min-h-screen bg-grayLight">
        <div className="z-40">
          <NavBar />
        </div>
        <div className="flex items-center z-30 w-full">
          <ReactFlowProvider>
            <OverviewFlow
              initialNodes={initialNodes}
              initialEdges={initialEdges}
            />
          </ReactFlowProvider>
        </div>
        <div className="absolute top-20 right-20 z-40">
          <SelectedPathModal />
        </div>
        <div
          className="absolute top-5 right-5 z-40"
          onClick={() => {
            setIsViewCheckList(!isViewCheckList);
          }}
        >
          {isViewCheckList ? (
            <CheckList status={CheckListItemStatus.SHOWN} />
          ) : (
            <CheckListIcon />
          )}
        </div>
      </div>
    </SelectedPathContextProvider>
  );
};

export default Home;
