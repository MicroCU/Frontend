"use client";
import PathDescription from "@/components/PathDescription";
import DirectedGraph from "@/components/path";
import { getInitialNodesAndEdges } from "@/utils/path";
import { useRef } from "react";
import { ReactFlowProvider } from "reactflow";

export default function Path({ params }: { params: { id: number } }) {
  const flowRef = useRef(null);
  const { initialNodes, initialEdges } = getInitialNodesAndEdges(params.id);

  return (
    <div className="overflow-y-scroll w-screen">
      <div className="w-full">
        <PathDescription
          name="Introduction Python 101"
          description="Python is an easy to learn, powerful programming language. It has
          efficient high-level data structures and a simple but effective
          approach to object-oriented programming. Python’s elegant syntax and
          dynamic typing, together with its interpreted nature, make it an ideal
          language for scripting and rapid application development in many areas
          on most platforms."
          tags={[
            {
              title: "Programming",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
            },
            {
              title: "Software Architecture",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
            }
          ]}
        />
      </div>
      <div
        ref={flowRef}
        className="w-screen bg-graySmall"
        style={{ height: "100vh" }}
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
