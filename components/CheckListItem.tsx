import Link from "next/link";
import { RadialProgress } from "./RadialProgress";
import I18nTypo from "./ui/I18nTypo";

type PathForCheckList = {
  name: string;
  id: string;
};
export interface ICheckListItem {
  journeyName: string;
  paths: PathForCheckList[];
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
    <div className="flex flex-row gap-x-4 justify-start">
      <div className="flex w-fit">
        <RadialProgress progress={progress} widthHeight={70} />
      </div>
      <div className="flex flex-col gap-y-2 justify-center w-3/5 flex-1">
        <I18nTypo className="Bold16 overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
          {journeyName}
        </I18nTypo>
        <div className="w-full pl-2">
          {paths.map((path, index) => (
            <li
              className="RegUnderline12 text-grayMedium overflow-hidden whitespace-nowrap overflow-ellipsis mb-2"
              key={index}
            >
              <Link href={"/path/" + path.id}>
                <I18nTypo className="inline">{path.name}</I18nTypo>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
