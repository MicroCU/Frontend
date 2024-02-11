import { Micro } from "@/types/path";

interface MicroTestProps {
  data: Micro;
  className?: string;
}

export default function MicroTest({ data, className }: MicroTestProps) {
  return (
    <div
      className={`border-3 p-4 rounded-2xl w-fit ${
        data.progress > 0 ? "bg-progressLight" : "bg-primaryLight"
      } ${className}`}
    >
      <div
        className={`${
          data.progress > 0 ? "bg-progress" : "bg-primary"
        } relative w-fit h-fit rounded-lg px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52 ${className}`}
      >
        <p className="break-words">{data.title}</p>
      </div>
    </div>
  );
}
