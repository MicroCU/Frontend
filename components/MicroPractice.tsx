import { Micro } from "@/types/path";

interface MicroPracticeProps {
  data: Micro;
  className?: string;
}

export default function MicroPractice({ data, className }: MicroPracticeProps) {
  return (
    <>
      <div
        className={`${
          data.progress > 0 ? "bg-progress" : "bg-primary"
        } relative w-fit h-fit rounded-lg px-5 py-3 text-white text-center Bold16 flex items-center justify-center max-w-52 ${className}`}
      >
        <p className="break-words">{data.title}</p>
      </div>
    </>
  );
}
