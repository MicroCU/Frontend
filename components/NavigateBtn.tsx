"use client";
import { useTranslation } from "@/context/Translation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import I18nTypo from "./ui/I18nTypo";

export default function NavigateBtn() {
  const { dict, lang } = useTranslation();
  return (
    <Link href={`/${lang}`}>
      <div className="flex flex-row items-center bg-graySmall text-grayMain rounded-lg pr-3 pl-1 py-1 w-fit">
        <ChevronLeft className="w-fit" />
        <I18nTypo className="Bold12"> {dict["path.button.back"]} </I18nTypo>
      </div>
    </Link>
  );
}
