import { ChevronRight } from 'lucide-react';

export interface PathItemsProps {
    name: string
    isSelected: boolean
    className?: string
}

export default function PathItems({ name, isSelected, className }: PathItemsProps) {
    return (
        <div className={`flex flex-row justify-between items-center px-3 py-2 min-h-[35px] 
        ${isSelected ? 'bg-primary text-white rounded-lg Medium16' : 'Reg16'} ${className}`}>
            <p> {name} </p>
            {isSelected && <ChevronRight />}
        </div>
    )
}