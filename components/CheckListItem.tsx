import { RadialProgress } from "./RadialProgress";
import I18nTypo from "./ui/I18nTypo";

export interface ICheckListItem {
  journeyName: string;
  paths: string[];
  progress: number;
}

export function CheckListItem({
  journeyName,
  paths,
  progress
}: ICheckListItem) {
  if (progress === 0) {
    return <></>;
  }
  return (
    <div className="max-w-[250px] flex flex-row gap-x-5 justify-center items-start">
      <div className="w-2/5">
        <RadialProgress progress={progress} widthHeight={70} />
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-start w-3/5">
        <p className="Bold16 overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          <I18nTypo>{journeyName}</I18nTypo>
        </p>
        <div className="w-full pl-2">
          {paths.map((path, index) => (
            <li
              className="RegUnderline12 text-grayMedium overflow-hidden whitespace-nowrap overflow-ellipsis"
              key={index}
            >
              <I18nTypo>{path}</I18nTypo>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
