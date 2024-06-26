import { cn } from "@/lib/utils";
import Image from "next/image";
import I18nTypo from "./ui/I18nTypo";

export interface TagProps {
  title: string;
  imageURL: string;
  className?: string;
}
export default function Tag({ title, imageURL, className }: TagProps) {
  return (
    <div
      className={cn(
        "flex flex-row bg-graySmall gap-2 text-grayMain items-center rounded-2xl px-3 py-1 w-fit",
        className
      )}
    >
      <Image src={imageURL} width={16} height={16} alt="Category Image" />
      <p className="Medium12 overflow-hidden whitespace-nowrap overflow-ellipsis">
      <I18nTypo>{title}</I18nTypo>
        
      </p>
    </div>
  );
}
