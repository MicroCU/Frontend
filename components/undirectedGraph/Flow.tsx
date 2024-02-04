"use client";
import { ReactFlowProvider } from "reactflow";
import OverviewFlow from "./Graph";
import { useJourney } from "@/context/Journeys";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import LoadingGraph from "../LoadingGraph";
import { MenuTab } from "@/types/enum";

export default function Flow() {
  const { journeys, selectedTab, searchKeyword } = useJourney();
  const { initialNodes, initialEdges } = generateInitialNodeEdge(
    journeys,
    selectedTab
  );
  if (
    (!journeys && selectedTab != MenuTab.search) ||
    (!journeys && selectedTab == MenuTab.search && searchKeyword != "")
  ) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <LoadingGraph />
      </div>
    );
  }
  return (
    <ReactFlowProvider>
      <OverviewFlow initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
}
