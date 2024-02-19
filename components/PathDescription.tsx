import { TagData } from "@/types/type";
import NavigateBtn from "./NavigateBtn";
import Tag from "./Tag";

export interface IPathDescriptionProps {
  name: string;
  description: string;
  tags: TagData[];
}

export default function PathDescription({
  name,
  description,
  tags
}: IPathDescriptionProps) {
  return (
    <div className="flex flex-col gap-y-4 py-6 px-20 bg-white effect-default">
      <NavigateBtn />
      <div className="flex flex-row gap-x-8 items-center">
        <div className="flex flex-col gap-y-4 w-2/5">
          <div className="Bold32 text-primary"> {name} </div>
          <div className="flex flex-row flex-wrap gap-3">
            {tags.map((tag, index) => (
              <Tag key={index} title={tag.name} imageURL={tag.icon} />
            ))}
          </div>
        </div>
        <div className="Reg16 text-grayMain w-3/5"> {description} </div>
      </div>
    </div>
  );
}
