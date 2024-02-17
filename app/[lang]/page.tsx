"use client";
import NavBar from "@/components/NavBar";
import { useState } from "react";
import SelectedPathModal from "@/components/SelectedPathModal";
import CheckListIcon from "@/components/CheckListIcon";
import CheckList from "@/components/CheckList";
import { JourneyGraphContextProvider } from "@/context/JourneysGraph";
import Flow from "@/components/undirectedGraph/Flow";
import CookiePopup from "@/components/CookiePopup";

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
          {isViewCheckList ? <CheckList /> : <CheckListIcon />}
        </div>
      </div>
      <CookiePopup className="z-40" />
    </JourneyGraphContextProvider>
  );
};

export default Home;
