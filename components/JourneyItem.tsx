"use client"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import PathItems from "./PathItems"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

export interface IPathItems {
    id: string
    name: string
}

export interface JourneyItemProps {
    id: string
    name: string
    paths: IPathItems[]
    selectedPath: string | null
    setSelectedPath: Dispatch<SetStateAction<string | null>>
    width?: number
}

export default function JourneyItem({ id, name, paths, selectedPath, setSelectedPath, width }: JourneyItemProps) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Collapsible open={open} onOpenChange={setOpen} style={{maxWidth: width}}>
            <CollapsibleTrigger className="text-black Bold16 uppercase">
                <div className="flex flex-row gap-x-4 shrink justify-start text-start items-center">
                    {open ? <ChevronDown className="h-4 w-4" strokeWidth={3} /> : <ChevronRight className="h-4 w-4" strokeWidth={3} />}
                    <span className="overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: `${width ? width - 32 : width}px` }}> {name} </span>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {paths.map((path, index) => (
                    <div key={path.id} onClick={() => {
                        setSelectedPath(path.id)
                    }} className = {`${index !== paths.length - 1 ? 'my-2' : ''} ml-5`} >
                        <PathItems name={path.name} isSelected={selectedPath === path.id} />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}