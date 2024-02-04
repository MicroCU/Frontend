"use client";
import { ReactFlowProvider } from "reactflow";
import OverviewFlow from "./Graph";
import { useJourney } from "@/context/Journeys";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";

export default function Flow() {
  const { journeys, selectedTab } = useJourney();
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
