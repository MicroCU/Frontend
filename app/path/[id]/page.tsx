"use client";
import Dagre from "@/components/directed-graph";
import { useScreenContext } from "@/components/context/ScreenContext";
import { ReactFlowProvider } from "reactflow";

export default function Path() {
  const { screenWidth, screenHeight } = useScreenContext();

  return (
    <div>
      <div style={{ width: "100vw", height: "5vh", backgroundColor: "blue" }}>
        <h1 style={{ textAlign: "center", backgroundColor: "pink" }}> 1 </h1>
      </div>
      <div style={{ width: "100vw", height: "95vh" }}>
        {screenWidth !== null && screenHeight != null && (
          <ReactFlowProvider>
            <Dagre screenWidth={screenWidth} screenHeight={screenHeight} />
          </ReactFlowProvider>
        )}
        {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
      </div>
    </div>
  );
}
