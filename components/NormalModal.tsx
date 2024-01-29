"use client";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Page } from "@/types/enum";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import JourneyModalItems, {
  IPath,
  JourneyModalType
} from "./JourneyModalItems";
import { useTranslation } from "@/context/Translation";

const mockPath: IPath[] = [
  {
    id: "1",
    name: "Path 1",
    description: "Description 1",
    categories: [
      {
        id: "1-1",
        name: "Category 1",
        imageURL:
          "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
      }
    ]
  },
  {
    id: "2",
    name: "Path 2",
    description:
      "Description 1 Description 1 Description 1Description 1Description 1Description 1Description 1Description 1Description 1Description 1",
    categories: [
      {
        id: "2-1",
        name: "Category 1",
        imageURL:
          "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
      }
    ]
  }
];

const NormalModal = () => {
  const { dict } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="container">{dict["home.switch.button"]}</Button>
      </DialogTrigger>
      <DialogContent className="w-[748px]">
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
            <div className="space-y-6 max-h-[720px] overflow-y-auto">
              <JourneyModalItems
                name="Journey 1"
                type={JourneyModalType.Shown}
                paths={mockPath}
              />
              <JourneyModalItems
                name="Journey 2"
                type={JourneyModalType.Shown}
                paths={mockPath}
              />
              <JourneyModalItems
                name="Journey 3"
                type={JourneyModalType.Shown}
                paths={mockPath}
              />
            </div>
          </TabsContent>
          <TabsContent value={Page.Recently}>
            {/* <JourneyModalItems
              name="Journey 2"
              type={JourneyModalType.Shown}
              paths={mockPath}
            /> */}
          </TabsContent>
          <TabsContent value={Page.Search}>
            {/* <JourneyModalItems
              name="Journey 3"
              type={JourneyModalType.Shown}
              paths={mockPath}
            /> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
