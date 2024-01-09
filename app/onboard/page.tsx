"use client";

import OnBoardModal from "@/components/OnBoardModal";
import { useState } from "react";

const OnBoardPage = () => {
  const [page, setPage] = useState<number>(0);

  const steps = ["welcome", "radio", "checkbox", "finish"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary to-danger">
      {steps.map((item, index) => {
        if (index === page) {
          return (
            <OnBoardModal
              key={index}
              variant={item as any}
              title={
                item === "radio" || item === "checkbox"
                  ? "What is your favorite subject?"
                  : undefined
              }
              onClick={() => setPage((p) => (p + 1) % steps.length)}
            />
          );
        }
      })}
    </div>
  );
};

export default OnBoardPage;
