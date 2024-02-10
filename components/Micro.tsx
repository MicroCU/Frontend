import { Micro, MicroType } from "@/types/path";
import MicroPractice from "./MicroPractice";
import MicroTest from "./MicroTest";
import MicroVideo from "./MicroVideo";

export interface MicroProps {
  data: Micro;
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
