import OnBoardContextProvider from "@/context/Onboard";
import { ReactNode } from "react";

const OnBoardLayout = ({ children }: { children: ReactNode }) => {
  return <OnBoardContextProvider>{children}</OnBoardContextProvider>;
};

export default OnBoardLayout;
