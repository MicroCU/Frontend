"use client";

import NavBar from "@/components/NavBar";
import SelectedPathModal from "@/components/SelectedPathModal";
import { Button } from "@/components/ui/button";
import { TagProps } from "@/types/type";
import { useSession } from "next-auth/react";

const descp =
  "Python is an easy to learn, powerful programming language. It has efficient high-level data structures Python is an easy to learn, powerful programming language. It has efficient high-level data structures";

const mockTags: TagProps[] = [
  {
    imageURL:
      "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
    title: "Programming"
  },
  {
    imageURL:
      "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png",
    title: "Python"
  }
];

const GraphPage = () => {
  const sess = useSession();

  if (sess.status === "unauthenticated")
    window.location.href = "http://localhost:3000/th/auth";
  return (
    <div className="flex min-h-screen bg-grayLight">
      <NavBar />
      <div className="flex items-center">
        <Button
          onClick={() => {
            window.location.href = "http://localhost:3000/auth";
          }}
        >
          auth
        </Button>
        <div>My name is {sess.data?.user.name}</div>
        <SelectedPathModal title="Python" description={descp} tags={mockTags} />
      </div>
    </div>
  );
};

export default GraphPage;
