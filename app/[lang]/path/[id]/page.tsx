"use client";
import DirectedGraph from "@/components/path";
import { getInitialNodesAndEdges } from "@/utils/path";
import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";

export default function Path({ params }: { params: { id: number } }) {
  const flowRef = useRef(null);
  const { initialNodes, initialEdges } = getInitialNodesAndEdges(params.id);

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-left bg-success">Path Information Naja</h1>
      </div>
      <div
        ref={flowRef}
        className="w-screen bg-graySmall"
        style={{ height: "95vh" }}
      >
        <ReactFlowProvider>
          <DirectedGraph
            flowRef={flowRef}
            initialNodes={initialNodes}
            initialEdges={initialEdges}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
