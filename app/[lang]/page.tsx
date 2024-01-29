"use client";
import NavBar from "@/components/NavBar";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import { BriefPathInfo } from "@/types/type";
import CheckListIcon from "@/components/CheckListIcon";

const GraphPage = () => {
  const [selectedPath, setSelectedPath] = useState<BriefPathInfo | null>(null);
  return (
    <div className="flex min-h-screen bg-grayLight">
      <div className="z-50">
        <NavBar />
      </div>
      <div className="flex items-center z-30 w-full">
        <ReactFlowProvider>
          <OverviewFlow setSelectedPath={setSelectedPath} />
        </ReactFlowProvider>
      </div>
      {selectedPath && (
        <div className="absolute top-20 right-20 z-50">
          <SelectedPathModal
            title={selectedPath.title}
            description={selectedPath.description}
            tags={selectedPath.tags}
          />
        </div>
      )}
      <div className="absolute top-5 right-5 z-40">
        <CheckListIcon />
      </div>
    </div>
  );
};

export default GraphPage;
