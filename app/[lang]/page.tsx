"use client";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { CheckListItemStatus } from "@/types/enum";
import { JourneyGraphContextProvider } from "@/context/JourneysGraph";
import Flow from "@/components/undirectedGraph/Flow";

const Home = () => {
  const [isViewCheckList, setIsViewCheckList] = useState<boolean>(false);
  return (
    <JourneyGraphContextProvider>
      <div className="flex min-h-screen bg-grayLight">
        <div className="z-40">
          <NavBar />
        </div>
        <div className="flex items-center z-30 w-full">
          <Flow />
        </div>
        <div className="absolute top-20 right-20 z-40">
          <SelectedPathModal />
        </div>
        <div
          className="absolute top-5 right-5 z-40"
          onClick={() => {
            setIsViewCheckList(!isViewCheckList);
          }}
        >
          {isViewCheckList ? (
            <CheckList status={CheckListItemStatus.SHOWN} />
          ) : (
            <CheckListIcon />
          )}
        </div>
      </div>
    </JourneyGraphContextProvider>
  );
};

export default Home;
