"use client";
import { Button } from "./ui/button";
import Tag from "./Tag";
import { useTranslation } from "@/context/Translation";
import { XCircle } from "lucide-react";
import { useJourneyGraph } from "@/context/JourneysGraph";
import Link from "next/link";

const SelectedPathModal = () => {
  const { dict, lang } = useTranslation();
  const { selectedPath, setSelectedPath } = useJourneyGraph();
  if (!selectedPath) return null;
  return (
    <div>
      <div className="w-[400px] bg-white p-6 rounded-[8px] space-y-6 border-2 border-primary shadow-xl">
        <div className="space-y-3">
          <h1 className="Bold32 text-primary">{selectedPath.name}</h1>
          <div className="flex gap-3">
            {selectedPath.tags.map((tag, index) => {
              return <Tag imageURL={tag.icon} title={tag.name} key={index} />;
            })}
          </div>
        </div>
        <h1 className="Reg16 text-grayMedium line-clamp-3">
          {selectedPath.description}
        </h1>
        <div className="flex justify-end">
          <Button asChild className="w-fit">
            <Link href={`/${lang}/path/${selectedPath.id}`}>
              {dict["home.selectedPathModal.button"]}
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute -top-3 -right-3">
        <XCircle
          size={32}
          fill="white"
          color="#5C4EFF"
          onClick={() => {
            setSelectedPath(null);
          }}
        />
      </div>
    </div>
  );
};
export default SelectedPathModal;
