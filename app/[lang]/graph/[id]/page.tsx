"use client";
import DirectedGraph from "@/components/path";
import { ReactFlowProvider } from "reactflow";
import { getInitialNodesAndEdges } from "./api";

export default function Path({ params }: { params: { id: number } }) {
  const { initialNodes, initialEdges } = getInitialNodesAndEdges(params.id);

  console.log("initialNodes", initialNodes);
  console.log("initialEdges", initialEdges);

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-left bg-success">Path Information Naja</h1>
      </div>
      <div className="w-screen bg-graySmall" style={{ height: "95vh" }}>
        <ReactFlowProvider>
          <DirectedGraph
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
