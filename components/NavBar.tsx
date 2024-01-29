"use client";
import { JourneyItem } from "./JourneyItems";
import { useState } from "react";
import NavBarOpenMode from "./NavBarOpen";
import NavBarCloseMode from "./NavBarClose";

interface NavBarProps {
  journeys: JourneyItem[];
}

const NavBar = ({ journeys }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    return <NavBarOpenMode setIsOpen={setIsOpen} journeys={journeys} />;
  } else {
    return <NavBarCloseMode setIsOpen={setIsOpen} />;
  }
};

export default NavBar;
