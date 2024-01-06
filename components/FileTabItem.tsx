import { ArrowDownToLine } from "lucide-react";

interface FileTabItemProps {
    name: string
}

const FileTabItem: React.FC<FileTabItemProps> = ({name}) => {
  return (
    <div className="flex justify-between w-[300px] gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain">
      <p>{name}</p>
      <ArrowDownToLine />
    </div>
  );
};

export default FileTabItem;
