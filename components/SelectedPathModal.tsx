"use client";
import { Button } from "./ui/button";
import Tag from "./Tag";
import { useTranslation } from "@/context/Translation";
import { XCircle } from "lucide-react";
import { useJourneyGraph } from "@/context/JourneysGraph";
import Link from "next/link";
import I18nTypo from "./ui/I18nTypo";

const SelectedPathModal = () => {
  const { dict, lang } = useTranslation();
  const { selectedPath, setSelectedPath } = useJourneyGraph();
  if (!selectedPath) return null;
  return (
    <div>
      <div className="w-[400px] bg-white p-6 rounded-[8px] space-y-6 border-2 border-primary shadow-xl">
        <div className="space-y-3">
          <h1 className="Bold32 text-primary">
            <I18nTypo>{selectedPath.name}</I18nTypo>
          </h1>
          <div className="flex gap-3">
            {selectedPath.tags.map((tag, index) => {
              return <Tag imageURL={tag.icon} title={tag.name} key={index} />;
            })}
          </div>
        </div>
        <h1 className="Reg16 text-grayMedium line-clamp-3">
          <I18nTypo> {selectedPath.description}</I18nTypo>
        </h1>
        <div className="flex justify-end">
          <Button asChild className="w-fit">
            <Link href={`/${lang}/path/${selectedPath.id}`}>
            <I18nTypo>
              {dict["home.selectedPathModal.button"]}
            </I18nTypo>
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 cursor-pointer">
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
