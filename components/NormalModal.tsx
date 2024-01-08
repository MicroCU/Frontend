import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Page } from "@/types/enum";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { MockContent } from "./NavBar";

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
            <MockContent text={Page.Journey} />
          </TabsContent>
          <TabsContent value={Page.Recently}>
            <MockContent text={Page.Recently} />
          </TabsContent>
          <TabsContent value={Page.Search}>
            <MockContent text={Page.Search} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default NormalModal;
