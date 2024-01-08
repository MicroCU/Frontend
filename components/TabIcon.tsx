import { LibraryBig, Search, History } from 'lucide-react';

export enum TabIconModeEnum {
    OUTLINE = "outline",
    FILLED = "filled",
}

export enum TabIconTypeEnum {
    library = "library",
    search = "search",
    history = "history",
}

export interface ITabIcon {
    type: TabIconTypeEnum
    mode: TabIconModeEnum
    className?: string
}

export default function TabIcon({ type, mode, className }: ITabIcon) {
    return (
        <div className={`w-8 h-8 rounded flex justify-center items-center ${mode === TabIconModeEnum.FILLED ? 'bg-grayMain' : ''} ${className}`}>
            {type === TabIconTypeEnum.library ? <LibraryBig className={`${mode === TabIconModeEnum.FILLED ? 'stroke-grayLight' : 'stroke-grayMain'}`} /> :
                type === TabIconTypeEnum.search ? <Search size={28} strokeWidth={2} className={`${mode === TabIconModeEnum.FILLED ? 'stroke-grayLight' : 'stroke-grayMain'}`} /> : 
                <History className={`${mode === TabIconModeEnum.FILLED ? 'stroke-grayLight' : 'stroke-grayMain'}`} />}
        </div>
    )
}