"use client";
import { ReactFlowProvider } from "reactflow";
import OverviewFlow from "./Graph";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";

export default function Flow() {
  const { journeys, selectedTab } = useJourneyGraph();
  const { initialNodes, initialEdges } = generateInitialNodeEdge(
    journeys,
    selectedTab
  );
  return (
    <ReactFlowProvider>
      <OverviewFlow initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
}
