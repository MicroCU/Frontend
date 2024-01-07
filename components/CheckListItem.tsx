import { RadialProgress } from "./RadialProgress"

export enum CheckListItemStatusEnum {
    LOADING = 1,
    SHOWN = 2,
}

export interface ICheckListItem {
    journey: string
    paths: string[]
    progress: number
    status: CheckListItemStatusEnum
}

export function CheckListItem({ journey, paths, progress, status }: ICheckListItem) {
    if (status === CheckListItemStatusEnum.LOADING) {
        return (
            <div className="max-w-[250px] flex flex-row flex-wrap grow gap-6 justify-center items-center">
                <RadialProgress progress={progress} widthHeight={80} status="LOADING" />
                <div className="flex flex-col gap-y-2 grow justify-center items-center">
                    <div className="h-4 w-full bg-grayLight rounded">
                    </div>
                    <div className="h-[41px] w-full bg-graySmall rounded"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="max-w-[250px] flex flex-row flex-wrap gap-6 justify-center">
            <RadialProgress progress={progress} widthHeight={80} />
            <div className="flex flex-col gap-y-2 justify-center items-center">
                <p className="Bold16"> {journey} </p>
                <div className="text-grayMedium max-w-[145px]">
                    {paths.map((path, index) => (
                        <li className="RegUnderline12 overflow-hidden whitespace-nowrap overflow-ellipsis" key={index}>
                            {path}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    )
}