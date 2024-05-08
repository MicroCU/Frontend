import { JourneyData } from "@/types/type";
import PathCard from "./PathCard";
import I18nTypo from "./ui/I18nTypo";

interface JourneyModalItemsProps {
  journey: JourneyData;
}

export default function JourneyModalItems({ journey }: JourneyModalItemsProps) {
  return (
    <>
      <I18nTypo className="Bold24 text-black uppercase mb-4">
        {journey.name}
      </I18nTypo>
      <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
        {journey.paths.data.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </>
  );
}
