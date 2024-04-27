"use client";

import { updateMaterialProgress } from "@/action/video";
import { usePath } from "@/context/Path";
import { ArrowDownToLine } from "lucide-react";

interface FileTabItemProps {
  id: string;
  fileName: string;
  fileUrl: string;
}

const FileTabItem: React.FC<FileTabItemProps> = ({ id, fileName, fileUrl }) => {
  const { pathId } = usePath();
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleOnClick = async () => {
    try {
      handleDownload();
      const res = await updateMaterialProgress(id, pathId);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div
      className="flex justify-between gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain"
      onClick={handleOnClick}
    >
      <p>{fileName}</p>
      <ArrowDownToLine />
    </div>
  );
};

export default FileTabItem;
