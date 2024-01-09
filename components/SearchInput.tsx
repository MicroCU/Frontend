import TabIcon, { TabIconModeEnum, TabIconTypeEnum } from "./TabIcon";

export interface ISearchInput {
  className?: string;
  defaultValue?: string;
}

export default function SearchInput({ className, defaultValue }: ISearchInput) {
  return (
    <div
      className={`flex flex-row gap-x-4 px-3 py-2 items-center justify-center bg-white text-grayMain rounded-md h-9 ${className}`}
    >
      <TabIcon
        type={TabIconTypeEnum.search}
        mode={TabIconModeEnum.OUTLINE}
        className="w-[14px] h-[14px]"
      />
      <input
        className="w-full h-full text-grayMain focus:outline-none focus:border-transparent"
        defaultValue={defaultValue}
      />
    </div>
  );
}
