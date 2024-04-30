"use client";

import { updateMaterialProgress } from "@/action/video";
import { usePath } from "@/context/Path";
import { DocumentData } from "@/types/type";
import { ArrowDownToLine } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useTranslation } from "@/context/Translation";

interface FileTabItemProps {
  data: DocumentData;
}

const FileTabItem: React.FC<FileTabItemProps> = ({ data }) => {
  const { lang } = useTranslation();
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
  const getHTMLContent = () => {
    const content = `
    <html>
      <head>
        <style>
          body {
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        ${data.content}
      </body>
    </html>
    `;
    return content;
  };
  return data.type == "html" ? (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-between gap-4 cursor-pointer bg-graySmall py-2.5 px-5 rounded-lg Bold16 text-grayMain">
          <p>{data.name}</p>
          <ArrowDownToLine />
        </div>
      </DialogTrigger>
      <DialogContent className="h-1/3">
        <iframe srcDoc={getHTMLContent()} className="w-full h-full"></iframe>
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
