"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ScreenSize {
  width: number;
  height: number;
}

const ScreenSizeContext = createContext<ScreenSize>({} as ScreenSize);

export const ScreenSizeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const updateScreenSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  return useContext(ScreenSizeContext);
};
