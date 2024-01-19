import JourneyModalItemsLoading from "./JourneyModalItemsLoading";
import PathCard, { PathCardType } from "./PathCard";

export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}

export interface IPath {
  id?: string;
  name?: string;
  description?: string;
  categories?: ICategory[];
}

export enum JourneyModalType {
  "Loading" = "loading",
  "Shown" = "shown"
}

export interface JourneyModalItemsProps {
  id?: string;
  name?: string;
  paths?: IPath[];
  type: JourneyModalType;
}

export default function JourneyModalItems({
  id,
  name,
  paths,
  type
}: JourneyModalItemsProps) {
  if (type === JourneyModalType.Loading) {
    <JourneyModalItemsLoading />;
  }

  return (
    <div>
      <p className="Bold24 text-black uppercase mb-4"> {name} </p>
      <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
        {paths &&
          paths.map((path) => (
            <PathCard
              key={path.id}
              name={path.name}
              description={path.description}
              categories={path.categories}
              type={PathCardType.Shown}
            />
          ))}
      </div>
    </div>
  );
}
