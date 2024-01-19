"use client";
import DirectedGraph from "@/components/path";
import { useScreenContext } from "@/components/context/ScreenContext";
import { ReactFlowProvider } from "reactflow";
import { getInitialNodesAndEdges } from "./node-edges";
import { getDagreLayouted as getDagreLayout } from "./dagre";

export default function Path() {
  const { screenWidth, screenHeight } = useScreenContext();
  const { initialNodes, initialEdges } = getInitialNodesAndEdges();
  const {
    nodes: lNode,
    edges: lEdge,
    rootInfo
  } = getDagreLayout(initialNodes, initialEdges); // Calculating (x, y) position of each node

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-left bg-success">Path Information Naja</h1>
      </div>
      <div className="w-screen bg-graySmall" style={{ height: "95vh" }}>
        {screenWidth !== null && screenHeight != null && (
          <ReactFlowProvider>
            <DirectedGraph initialNodes={lNode} initialEdges={lEdge} />
          </ReactFlowProvider>
        )}
        {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
      </div>
    </div>
  );
}
