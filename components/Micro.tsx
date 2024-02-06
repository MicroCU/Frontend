import { Micro } from "@/types/path";
import MicroPractice from "./MicroPractice";
import MicroTest from "./MicroTest";
import MicroVideo from "./MicroVideo";
import { MicroType } from "@/types/enum";

export interface MicroProps {
  data: Micro;
  isGroup?: boolean;
  className?: string;
}

export default function Micro({ data, isGroup = true, className }: MicroProps) {
  return (
    <>
      {data.type === MicroType.Video ? (
        <MicroVideo data={data} isGroup={isGroup} className={className} />
      ) : data.type === MicroType.Practice ? (
        <MicroPractice data={data} className={className} />
      ) : data.type === MicroType.Test ? (
        <MicroTest data={data} className={className} />
      ) : (
        <></>
      )}
    </>
  );
}
