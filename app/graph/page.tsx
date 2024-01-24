"use client";
import { ReactFlowProvider } from "reactflow";
import OverviewFlow from "./graph";

export default function Graph() {
  return (
    <div className="w-full h-screen">
      <ReactFlowProvider>
        <OverviewFlow />
      </ReactFlowProvider>
    </div>
  );
}
