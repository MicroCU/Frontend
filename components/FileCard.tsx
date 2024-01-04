import { ArrowDownToLine } from "lucide-react";

const FileCard = () => {
  return (
    <div className="flex justify-between w-full gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16">
      <p>list</p>
      <ArrowDownToLine />
    </div>
  );
};

export default FileCard;
