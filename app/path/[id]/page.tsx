"use client";
import DirectedGraph from "@/components/path";
import { useScreenContext } from "@/components/context/ScreenContext";
import { ReactFlowProvider } from "reactflow";

export default function Path() {
  const { screenWidth, screenHeight } = useScreenContext();

  return (
    <div>
      <div className="w-screen" style={{ height: "5vh" }}>
        <h1 className="h-full text-center bg-success"> 1 </h1>
      </div>
      <div className="w-screen bg-graySmall" style={{ height: "95vh" }}>
        {screenWidth !== null && screenHeight != null && (
          <ReactFlowProvider>
            <DirectedGraph
              screenWidth={screenWidth}
              screenHeight={screenHeight}
            />
          </ReactFlowProvider>
        )}
        {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
      </div>
    </div>
  );
}
