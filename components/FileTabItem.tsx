"use client";

import { ArrowDownToLine } from "lucide-react";

interface FileTabItemProps {
  fileName: string;
  fileUrl: string;
}

const FileTabItem: React.FC<FileTabItemProps> = ({ fileName, fileUrl }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div
      className="flex justify-between gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain"
      onClick={handleDownload}
    >
      <p>{fileName}</p>
      <ArrowDownToLine />
    </div>
  );
};

export default FileTabItem;
