import { IPath } from "@/components/JourneyModalItems";
import NavBar from "@/components/NavBar";
import SelectedPathModal from "@/components/SelectedPathModal";
import { TagProps } from "@/types/type";

const descp =
  "Python is an easy to learn, powerful programming language. It has efficient high-level data structures Python is an easy to learn, powerful programming language. It has efficient high-level data structures";

const mockTags: TagProps[] = [
  { imageURL: "", title: "Programming" },
  { imageURL: "", title: "Python" }
];

const mockPath: IPath[] = [
  {
    id: "1",
    name: "Path 1",
    description: "Description 1",
    categories: [
      {
        id: "1",
        name: "Category 1",
        imageURL: ""
      }
    ]
  },
  {
    id: "1",
    name: "Path 1",
    description: "Description 1",
    categories: [
      {
        id: "1",
        name: "Category 1",
        imageURL: ""
      }
    ]
  }
];

const EarthPage = () => {
  return (
    <div className="flex min-h-screen bg-grayLight">
      <NavBar />
      <div className="flex items-center">
        <SelectedPathModal title="Python" description={descp} tags={mockTags} />
      </div>
    </div>
  );
};

export default EarthPage;
