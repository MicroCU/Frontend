"use client";
import { ReactFlowProvider } from "reactflow";
import OverviewFlow from "./Graph";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import { MenuTab } from "@/types/enum";
import { Player as Lottie } from "@lottiefiles/react-lottie-player";

export default function Flow() {
  const { journeys, selectedTab, searchKeyword } = useJourneyGraph();
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
        <Lottie autoplay loop src="/lottie/graph.json" />
      </div>
    );
  }
  return (
    <ReactFlowProvider>
      <OverviewFlow initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
}
