import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Page } from "@/types/enum";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import JourneyModalItems, {
  IPath,
  JourneyModalType
} from "./JourneyModalItems";

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
    description:
      "Description 1 Description 1 Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1",
    categories: [
      {
        id: "1",
        name: "Category 1",
        imageURL: ""
      }
    ]
  }
];

const NormalModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">Switch to Normal Mode</Button>
      </DialogTrigger>
      <DialogContent className="w-[748px]">
        <Tabs defaultValue={Page.Journey} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-grayLight mb-6">
            <TabsTrigger value="journey">Journey</TabsTrigger>
            <TabsTrigger value="recently">Recently</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value={Page.Journey}>
            <JourneyModalItems
              name="Journey 1"
              type={JourneyModalType.Shown}
              paths={mockPath}
            />
          </TabsContent>
          <TabsContent value={Page.Recently}></TabsContent>
          <TabsContent value={Page.Search}></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
