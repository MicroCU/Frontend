"use client";
import { TagProps } from "@/types/type";
import { Button } from "./ui/button";
import Tag from "./Tag";
import { useTranslation } from "@/context/Translation";
import { useSelectedPath } from "@/context/SelectedPath";

const SelectedPathModal = () => {
  const { dict } = useTranslation();
  const { selectedPath } = useSelectedPath();
  if (!selectedPath) return null;
  return (
    <div className="w-[400px] bg-white p-6 rounded-[8px] space-y-6 border-2 border-primary shadow-xl">
      <div className="space-y-3">
        <h1 className="Bold32 text-primary">{selectedPath.title}</h1>
        <div className="flex gap-3">
          {selectedPath.tags.map((tag, index) => {
            return (
              <Tag imageURL={tag.imageURL} title={tag.title} key={index} />
            );
          })}
        </div>
      </div>
      <h1 className="Reg16 text-grayMedium line-clamp-3">
        {selectedPath.description}
      </h1>
      <div className="flex justify-end">
        <Button className="w-fit">
          {dict["home.SelectedPathModal.button"]}
        </Button>
      </div>
    </div>
  );
};
export default SelectedPathModal;
