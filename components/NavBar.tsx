import { Page } from "@/types/enum";
import NavHeader from "./NavHeader";
import NormalModal from "./NormalModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JourneyItems, { IJourneyItem } from "./JourneyItems";

const mockJourneys: IJourneyItem[] = [
  {
    id: "1",
    name: "Journey 1",
    paths: [
      {
        id: "1",
        name: "Path 1"
      },
      {
        id: "2",
        name: "Path 2"
      }
    ]
  },
  {
    id: "2",
    name: "Journey 2",
    paths: [
      {
        id: "1",
        name: "Path 1"
      },
      {
        id: "2",
        name: "Path 2"
      }
    ]
  }
];

const NavBar = () => {
  return (
    <div className="space-y-6 p-6 bg-white shadow-md h-screen w-fit flex flex-col">
      <NavHeader />
      <Tabs defaultValue={Page.Journey} className="flex-1">
        <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="recently">Recently</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>
        <TabsContent value={Page.Journey}>
          <JourneyItems journeys={mockJourneys} className="flex-1" />
        </TabsContent>
        <TabsContent value={Page.Recently}></TabsContent>
        <TabsContent value={Page.Search}></TabsContent>
      </Tabs>
      <NormalModal />
    </div>
  );
};
export default NavBar;

type MockContentProps = {
  text: string;
};

export const MockContent = ({ text }: MockContentProps) => {
  // TODO: Replace with real content
  return (
    <div className="p-4 bg-grayLight h-full">
      <h1>{text}</h1>
    </div>
  );
};
