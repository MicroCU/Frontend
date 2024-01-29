"use client";
import NavBar from "@/components/NavBar";
import SelectedPathModal from "@/components/SelectedPathModal";
import { TagProps } from "@/types/type";
import OverviewFlow from "../../components/undirectedGraph/Graph";
import { ReactFlowProvider } from "reactflow";

const descp =
  "Python is an easy to learn, powerful programming language. It has efficient high-level data structures Python is an easy to learn, powerful programming language. It has efficient high-level data structures";

const mockTags: TagProps[] = [
  {
    imageURL:
      "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
    title: "Programming"
  },
  {
    imageURL:
      "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
    title: "Python"
  }
];

const GraphPage = () => {
  return (
    <div className="flex min-h-screen bg-grayLight">
      <div className="z-50">
        <NavBar />
      </div>
      <div className="flex items-center z-40 w-full">
        {/* <SelectedPathModal title="Python" description={descp} tags={mockTags} /> */}
        <ReactFlowProvider>
          <OverviewFlow />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default GraphPage;
