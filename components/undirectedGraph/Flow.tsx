import { ReactFlowProvider } from "reactflow";
import { useJourneyGraph } from "@/context/JourneysGraph";
import { generateInitialNodeEdge } from "@/lib/undirected-nodes-edges";
import UndirectedGraph from "./UndirectedGraph";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("@/components/Lottie"), { ssr: false });

export default function Flow() {
  const { journeys, selectedTab, searchKeyword } = useJourneyGraph();
  const { nodes, edges } = generateInitialNodeEdge(journeys, selectedTab);
  if (!journeys) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Lottie src="/lottie/graph.json" />
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <UndirectedGraph initialNodes={nodes} initialEdges={edges} />
    </ReactFlowProvider>
  );
}
