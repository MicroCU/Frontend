"use client";

import { updateMaterialProgress } from "@/action/video";
import { usePath } from "@/context/Path";
import { DocumentData } from "@/types/type";
import { ArrowDownToLine } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface FileTabItemProps {
  data: DocumentData;
}

const FileTabItem: React.FC<FileTabItemProps> = ({ data }) => {
  const { pathId } = usePath();
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data.link;
    link.download = data.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleOnClick = async () => {
    try {
      handleDownload();
      const res = await updateMaterialProgress(data.id, pathId);
    } catch (e) {
      console.error(e);
    }
  };
  return data.type == "html" ? (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-between gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain">
          <p>{data.name}</p>
          <ArrowDownToLine />
        </div>
      </DialogTrigger>
      <DialogContent>
        <iframe srcDoc={data.content} className="w-full"></iframe>
      </DialogContent>
    </Dialog>
  ) : (
    <div
      className="flex justify-between gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain"
      onClick={handleOnClick}
    >
      <p>{data.name}</p>
      <ArrowDownToLine />
    </div>
  );
};

export default FileTabItem;
