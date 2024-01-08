import { TagProps } from "@/types/type";
import { Button } from "./ui/button";
import Tag from "./Tag";

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
  return (
    <div className="w-[400px] bg-white p-6 rounded-[8px] space-y-6 border-2 border-primary shadow-xl">
      <div className="space-y-3">
        <h1 className="Bold32 text-primary">{title}</h1>
        <div className="flex gap-3">
          {tags.map((tag) => {
            return <Tag imageURL={tag.imageURL} title={tag.title} />;
          })}
        </div>
      </div>
      <h1 className="Reg16 text-grayMedium line-clamp-3">{description}</h1>
      <div className="flex justify-end">
        <Button className="w-fit">Go to path</Button>
      </div>
    </div>
  );
};
export default SelectedPathModal;
