import { ListTodo } from 'lucide-react';
import { CheckListItem, CheckListItemStatusEnum, ICheckListItem } from "./CheckListItem";

export interface ICheckListProps {
    checkListItems: ICheckListItem[]
    status: CheckListItemStatusEnum
    className?: string
}

export default function CheckList({ checkListItems, status, className }: ICheckListProps) {
    const loadingItems = Array.from({ length: 3 });
    return (
        <div className={`flex flex-col gap-y-4 bg-white p-6 rounded-lg w-[250px] overflow-y-auto drop-shadow-lg ${className}`}>
            <div className="flex items-center gap-x-1">
                <ListTodo size={24} className="stroke-primary" />
                <p className="Bold24 text-primary"> Checklist </p>
            </div>
            {status === CheckListItemStatusEnum.COMPLETED ? (
                <div className="w-[200px] h-full flex justify-center items-center">
                    <p className="Reg12"> All Journeys are accomplished </p>
                </div>
            ) : status === CheckListItemStatusEnum.LOADING ? (
                loadingItems.map((_, index) => (
                    <CheckListItem key={index} journey="" paths={[]} progress={0} status={status} />
                ))
            ) : (
                checkListItems.map((checkListItem, index) => (
                    <CheckListItem key={index} journey={checkListItem.journey} paths={checkListItem.paths} progress={checkListItem.progress} status={status} />
                ))
            )}
        </div>
    )
}