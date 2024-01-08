import NavHeader from "./NavHeader";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

enum Page {
  Journey = "journey",
  Recently = "recently",
  Search = "search",
}

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
          <MockContent text={Page.Journey} />
        </TabsContent>
        <TabsContent value={Page.Recently}>
          <MockContent text={Page.Recently} />
        </TabsContent>
        <TabsContent value={Page.Search}>
          <MockContent text={Page.Search} />
        </TabsContent>
      </Tabs>
      <Button size="w-full">Switch to Normal Mode</Button>
    </div>
  );
};
export default NavBar;

type MockContentProps = {
  text: string;
};

const MockContent = ({ text }: MockContentProps) => {
  return (
    <div className="p-4 bg-grayLight h-full">
      <h1>{text}</h1>
    </div>
  );
};
