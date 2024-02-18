"use client";
import UndirectedGraph from "@/components/UndirectedGraph";
import { mockGraphData } from "@/mock/graph_data";
import { ReactFlowProvider } from "reactflow";

export default function Graph({ params }: { params: { id: number } }) {
  const { nodes, edges } = mockGraphData[params.id];
  console.log(nodes, edges);
  return (
    <div className="w-screen h-screen bg-graySmall">
      <ReactFlowProvider>
        <UndirectedGraph initialNodes={nodes} initialEdges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
