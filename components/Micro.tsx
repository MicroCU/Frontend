import { MicroType } from "@/types/enum";
import { MicroData } from "@/types/type";
import MicroVideo from "./MicroVideo";
import MicroPractice from "./MicroPractice";
import MicroTest from "./MicroTest";

export interface MicroProps {
  data: MicroData;
  isGroup?: boolean;
  className?: string;
}

export default function Micro({ data, isGroup = true, className }: MicroProps) {
  return (
    <>
      {data.type === MicroType.VIDEO ? (
        <MicroVideo data={data} isGroup={isGroup} className={className} />
      ) : data.type === MicroType.PRACTICE ? (
        <MicroPractice data={data} className={className} />
      ) : data.type === MicroType.TEST ? (
        <MicroTest data={data} className={className} />
      ) : (
        <></>
      )}
    </>
  );
}
