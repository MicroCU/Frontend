"use client";
import DirectedGraph from "@/components/path/DirectedGraph";
import { useScreenContext } from "@/components/context/ScreenContext";
import { ReactFlowProvider } from "reactflow";
import { getInitialNodesAndEdges } from "./node-edges";
import { getDagreLayouted as getDagreLayout } from "./dagre";
import PathDescription from "@/components/path/PathDescription";

export default function Path() {
  const { screenWidth, screenHeight } = useScreenContext();
  const { initialNodes, initialEdges } = getInitialNodesAndEdges();
  const {
    nodes: lNode,
    edges: lEdge,
    rootInfo
  } = getDagreLayout(initialNodes, initialEdges); // Calculating (x, y) position of each node

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
      <div className="w-full bg-graySmall" style={{ height: "100vh" }}>
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
