"use client";
import { ReactFlowProvider } from "reactflow";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import { Player as Lottie } from "@lottiefiles/react-lottie-player";
import UndirectedGraph from "./UndirectedGraph";

export default function Flow() {
  const { journeys, selectedTab, searchKeyword } = useJourneyGraph();
  const { nodes, edges } = generateInitialNodeEdge(journeys, selectedTab);
  if (!journeys) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Lottie autoplay loop src="/lottie/graph.json" />
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <UndirectedGraph initialNodes={nodes} initialEdges={edges} />
    </ReactFlowProvider>
  );
}
