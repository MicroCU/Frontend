"use client";
import { useState } from "react";
import NavBarOpenMode from "./NavBarOpen";
import NavBarCloseMode from "./NavBarClose";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  if (isOpen) {
    return <NavBarOpenMode setIsOpen={setIsOpen} />;
  } else {
    return <NavBarCloseMode setIsOpen={setIsOpen} />;
  }
};

export default NavBar;
