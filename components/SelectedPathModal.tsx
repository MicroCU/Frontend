"use client";
import { TagProps } from "@/types/type";
import { Button } from "./ui/button";
import Tag from "./Tag";
import { useDictionaryContext } from "@/context/Dictionary";

type SelectedPathModalProps = {
  title: string;
  description: string;
  tags: TagProps[];
};

const SelectedPathModal = ({
  title,
  description,
  tags
}: SelectedPathModalProps) => {
  const dictionary = useDictionaryContext();
  return (
    <div className="w-[400px] bg-white p-6 rounded-[8px] space-y-6 border-2 border-primary shadow-xl">
      <div className="space-y-3">
        <h1 className="Bold32 text-primary">{title}</h1>
        <div className="flex gap-3">
          {tags.map((tag, index) => {
            return (
              <Tag imageURL={tag.imageURL} title={tag.title} key={index} />
            );
          })}
        </div>
      </div>
      <h1 className="Reg16 text-grayMedium line-clamp-3">{description}</h1>
      <div className="flex justify-end">
        <Button className="w-fit">
          {dictionary["home.SelectedPathModal.button"]}
        </Button>
      </div>
    </div>
  );
};
export default SelectedPathModal;
