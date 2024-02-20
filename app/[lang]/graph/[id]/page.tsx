"use client";
import UndirectedGraph from "@/components/undirectedGraph/UndirectedGraph";
import { mockGraphData } from "@/mock/graph_data";
import { ReactFlowProvider } from "reactflow";

export default function Graph({ params }: { params: { id: number } }) {
  const { nodes, edges } = mockGraphData[params.id];
  return (
    <div className="w-screen h-screen bg-graySmall">
      <ReactFlowProvider>
        <UndirectedGraph initialNodes={nodes} initialEdges={edges} />
      </ReactFlowProvider>
    </div>
  );
}
