"use client";
import { useTranslation } from "@/context/Translation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NavigateBtn() {
  const { dict, lang } = useTranslation();
  return (
    <Link href={`/${lang}`}>
      <div className="flex flex-row items-center bg-graySmall text-grayMain rounded-lg pr-3 pl-1 py-1 w-fit">
        <ChevronLeft className="w-fit" />
        <p className="Bold12"> {dict["path.button.back"]} </p>
      </div>
    </Link>
  );
}
