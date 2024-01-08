import { ListTodo } from 'lucide-react';
import { CheckListItem, CheckListItemStatusEnum, ICheckListItem } from "./CheckListItem";
import { Skeleton } from "@/components/ui/skeleton"

export interface ICheckListProps {
    checkListItems: ICheckListItem[]
    status: CheckListItemStatusEnum
    className?: string
}

export default function CheckList({ checkListItems, status, className }: ICheckListProps) {
    const loadingItems = Array.from({ length: 3 });
    return (
        <div className={`flex flex-col gap-y-4 bg-white p-6 rounded-lg w-[250px] overflow-y-auto effect-default ${className}`}>
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
                    <div key={index}>
                        <div className="max-w-[250px] flex flex-row grow gap-6 justify-center items-center">
                            <div className="w-2/5">
                                <Skeleton className="h-[70px] w-[70px] rounded-full bg-grayLight" />
                            </div>
                            <div className="flex flex-col gap-y-2 grow justify-center items-center w-3/5">
                                <Skeleton className="h-4 w-full bg-grayLight" />
                                <Skeleton className="h-[41px] w-full bg-graySmall" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                checkListItems.map((checkListItem, index) => (
                    <CheckListItem key={index} journey={checkListItem.journey} paths={checkListItem.paths} progress={checkListItem.progress} status={status} />
                ))
            )}
        </div>
    )
}