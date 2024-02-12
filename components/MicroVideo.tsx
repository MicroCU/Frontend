"use client";
import { useTranslation } from "@/context/Translation";
import { cn } from "@/lib/utils";
import { Micro } from "@/types/path";
import Link from "next/link";

interface MicroVideoProps {
  data: Micro;
  isGroup: boolean;
  className?: string;
}

export default function MicroVideo({
  data,
  isGroup,
  className
}: MicroVideoProps) {
  const { lang } = useTranslation();
  return (
    <Link href={`/${lang}/video/${data.id}`}>
      <div
        className={cn(
          isGroup ? "bg-grayLight" : "bg-white",
          "relative w-fit h-fit rounded-lg",
          className
        )}
      >
        <div className="w-fit h-full px-5 py-3 text-center Bold16 flex items-center justify-center max-w-52">
          <p className="break-words">{data.title}</p>
        </div>
        {data.progress > 0 && data.progress <= 100 && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary"
            style={{ width: data.progress + "%" }}
          ></div>
        )}
      </div>
    </Link>
  );
}
