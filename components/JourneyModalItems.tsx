"use client";
import { JourneyData } from "@/types/type";
import PathCard from "./PathCard";
import Link from "next/link";
import { useTranslation } from "@/context/Translation";

interface JourneyModalItemsProps {
  journey: JourneyData;
}

export default function JourneyModalItems({ journey }: JourneyModalItemsProps) {
  const { lang } = useTranslation();
  return (
    <Link href={`/${lang}/path/${journey.id}`}>
      <p className="Bold24 text-black uppercase mb-4"> {journey.name} </p>
      <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
        {journey.paths.data.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </Link>
  );
}
