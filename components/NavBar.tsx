"use client";
import { Page } from "@/types/enum";
import NavHeader from "./NavHeader";
import NormalModal from "./NormalModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import JourneyItems, { IJourneyItem } from "./JourneyItems";
import { useTranslation } from "@/context/Translation";
import { useAuth } from "@/context/Auth";

const mockJourneys: IJourneyItem[] = [
  {
    id: "1",
    name: "Journey 1",
    paths: [
      {
        id: "1-1",
        name: "Path 1"
      },
      {
        id: "1-2",
        name: "Path 2"
      }
    ]
  },
  {
    id: "2",
    name: "Journey 2",
    paths: [
      {
        id: "2-1",
        name: "Path 1"
      },
      {
        id: "2-2",
        name: "Path 2"
      }
    ]
  }
];

const NavBar = () => {
  const { dict } = useTranslation();
  return (
    <>
      <div className="space-y-6 p-6 bg-white shadow-md h-screen w-fit flex flex-col">
        <NavHeader />
        <Tabs defaultValue={Page.Journey} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
            <TabsTrigger value="journey">
              {dict["home.tabs.journey"]}
            </TabsTrigger>
            <TabsTrigger value="recently">
              {dict["home.tabs.recently"]}
            </TabsTrigger>
            <TabsTrigger value="search">{dict["home.tabs.search"]}</TabsTrigger>
          </TabsList>
          <TabsContent value={Page.Journey}>
            <JourneyItems journeys={mockJourneys} className="flex-1" />
          </TabsContent>
          <TabsContent value={Page.Recently}></TabsContent>
          <TabsContent value={Page.Search}></TabsContent>
        </Tabs>
        <NormalModal />
      </div>
    </>
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
