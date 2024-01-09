import PathCard, { PathCardType } from "./PathCard"
import { Skeleton } from "@/components/ui/skeleton"

interface ICategory {
    id: string
    name: string
    imageURL: string
}

interface IPath {
    id?: string
    name?: string
    description?: string
    categories?: ICategory[]
}

export enum JourneyModalType {
    'Loading' = 'loading',
    'Shown' = 'shown'
}

export interface JourneyModalItemsProps {
    id?: string
    name?: string
    paths?: IPath[]
    type: JourneyModalType
}

export default function JourneyModalItems({ id, name, paths, type }: JourneyModalItemsProps) {
    if (type === JourneyModalType.Loading) {
        const loadingItems = Array.from({ length: 2 });
        return (
            <div>
                <Skeleton className="w-3/6 h-[32px] bg-grayLight rounded mb-4" />
                <div className="flex flex-row w-full h-full">
                    <Skeleton className="w-[16px] flex-x-1 bg-grayLight rounded" />
                    <div className="flex flex-col flex-1 gap-y-4 pl-6 border-graySmall">
                        {loadingItems.map((_, index) => (
                            <PathCard key={index} type={PathCardType.Loading} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="Bold24 text-black uppercase mb-4"> {name} </p>
            <div className="flex flex-col gap-y-4 border-l-4 pl-6 ml-6 border-grayMain">
                {paths && paths.map((path) => (
                    <PathCard key={path.id} name={path.name} description={path.description} categories={path.categories} type={PathCardType.Shown} />
                ))}
            </div>
        </div>
    )
}