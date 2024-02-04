import { JourneyData } from "@/types/type";
import PathCard from "./PathCard";

interface JourneyModalItemsProps {
  journey: JourneyData;
}

export default function JourneyModalItems({ journey }: JourneyModalItemsProps) {
  return (
    <div>
      <p className="Bold24 text-black uppercase mb-4"> {journey.name} </p>
      <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
        {journey.paths.data.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </div>
  );
}
