import NavigateBtn from "./NavigateBtn";
import Tag from "./Tag";

export interface IPathDescriptionProps {
  name: string;
  description: string;
  tags: {
    title: string;
    imageURL: string;
  }[];
}

export default function PathDescription({
  name,
  description,
  tags
}: IPathDescriptionProps) {
  return (
    <div className="flex flex-col gap-y-4 pt-[60px] pb-12 px-20 bg-white effect-default">
      <NavigateBtn />
      <div className="flex flex-row gap-x-8 items-center">
        <div className="flex flex-col gap-y-4">
          <div className="Bold32 text-primary"> {name} </div>
          <div className="flex flex-row flex-wrap gap-3">
            {tags.map((tag, index) => (
              <Tag key={index} title={tag.title} imageURL={tag.imageURL} />
            ))}
          </div>
        </div>
        <div className="Reg16 text-grayMain"> {description} </div>
      </div>
    </div>
  );
}
