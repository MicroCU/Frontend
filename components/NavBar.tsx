"use client";
import { IJourneyItem } from "./JourneyItems";
import { useState } from "react";
import NavBarOpenMode from "./NavBarOpen";
import NavBarCloseMode from "./NavBarClose";

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
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    return <NavBarOpenMode setIsOpen={setIsOpen} journeys={mockJourneys} />;
  } else {
    return <NavBarCloseMode setIsOpen={setIsOpen} />;
  }
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
