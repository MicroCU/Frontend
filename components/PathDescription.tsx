"use client";
import { TagData } from "@/types/type";
import NavigateBtn from "./NavigateBtn";
import Tag from "./Tag";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface IPathDescriptionProps {
  name: string;
  description: string;
  tags: TagData[];
  setHeight: Dispatch<SetStateAction<number>>;
}

export default function PathDescription({
  name,
  description,
  tags,
  setHeight
}: IPathDescriptionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const componentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (componentRef.current) {
      setHeight(
        window.innerHeight - componentRef.current.getBoundingClientRect().height
      );
    }
    if (!isOpen) {
      setHeight(window.innerHeight);
    }
  }, [componentRef, isOpen, setHeight]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleContent className="relative z-50">
        <div
          className="flex flex-col gap-y-4 py-6 px-20 bg-white effect-default z-50"
          ref={componentRef}
        >
          <NavigateBtn />
          <div className="flex flex-row gap-x-8 items-center">
            <div className="flex flex-col gap-y-4 w-2/5">
              <div className="Bold32 text-primary"> {name} </div>
              <div className="flex flex-row flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <Tag key={index} title={tag.name} imageURL={tag.icon} />
                ))}
              </div>
            </div>
            <div className="Reg16 text-grayMain w-3/5"> {description} </div>
          </div>
          <div className="flex justify-center"> 1</div>
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        {isOpen ? (
          <div className="absolute inset-x-0 -bottom-6 flex justify-center items-center z-40">
            <div className="bg-white flex justify-center w-16 h-fit effect-default rounded-b-lg">
              <ChevronUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-0 -bottom-6 flex justify-center items-center z-40">
            <div className="bg-white flex justify-center w-16 h-fit effect-default rounded-b-lg">
              <ChevronDown className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </CollapsibleTrigger>
    </Collapsible>
  );
}
