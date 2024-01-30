import { JourneyData } from "@/types/type";
import JourneyModalItemsLoading from "./JourneyModalItemsLoading";
import PathCard, { PathCardType } from "./PathCard";

export enum JourneyModalType {
  "Loading" = "loading",
  "Shown" = "shown"
}

interface JourneyModalItemsProps {
  journey: JourneyData;
  type: JourneyModalType;
}

export default function JourneyModalItems({
  journey,
  type
}: JourneyModalItemsProps) {
  if (type === JourneyModalType.Loading) {
    <JourneyModalItemsLoading />;
  }

  return (
    <div>
      <p className="Bold24 text-black uppercase mb-4"> {journey.name} </p>
      <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
        {journey.paths.data.map((path) => (
          <PathCard key={path.id} path={path} type={PathCardType.Shown} />
        ))}
      </div>
    </div>
  );
}
