import { RadialProgress } from "./RadialProgress"

export enum CheckListItemStatusEnum {
    LOADING = "LOADING",
    SHOWN = "SHOWN",
    COMPLETED = "COMPLETED",
}

export interface ICheckListItem {
    journey: string
    paths: string[]
    progress: number
    status: CheckListItemStatusEnum
}

export function CheckListItem({ journey, paths, progress, status }: ICheckListItem) {
    return (
        <div className="max-w-[250px] flex flex-row gap-x-5 justify-center items-start">
            <div className="w-2/5">
                <RadialProgress progress={progress} widthHeight={70} />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-start w-3/5">
                <p className="Bold16 overflow-hidden whitespace-nowrap overflow-ellipsis w-full"> {journey} </p>
                <div className="w-full pl-2">
                    {paths.map((path, index) => (
                        <li className="RegUnderline12 text-grayMedium overflow-hidden whitespace-nowrap overflow-ellipsis" key={index}>
                            {path}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}