"use client";
import Tag from "./Tag";
import { Text } from "lucide-react";
import { BriefPathInfo } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/Translation";

export interface PathCardProps {
  path: BriefPathInfo;
}

export default function PathCard({ path }: PathCardProps) {
  const { lang } = useTranslation();
  return (
    <Link href={`/${lang}/path/${path.id}`}>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-y-2 w-10/12">
          <p className="Bold16 text-black"> {path.name} </p>
          <p className="Reg12 text-grayMain line-clamp-2">{path.description}</p>
          <div className="flex flex-row gap-x-2">
            {path.tags?.map((category) => (
              <Tag
                title={category.name}
                imageURL={category.icon}
                key={category.id}
              />
            ))}
          </div>
        </div>
        {path.picture ? (
          <div className="relative flex flex-col justify-center items-center w-[200px] h-[120px] overflow-hidden">
            <Image
              src={path.picture}
              alt={path.name}
              width={200}
              height={120}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-[200px] h-[120px] bg-graySmall">
            <div className="bg-grayMedium w-fit h-fit rounded p-[2px]">
              <Text strokeWidth={3} className="stroke-graySmall" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
