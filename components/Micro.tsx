import { MicroTypeEnum } from "@/types/enum";
import { IMicroData } from "@/types/type";
import MicroVideo from "./MicroVideo";
import MicroPractice from "./MicroPractice";
import MicroTest from "./MicroTest";

export interface MicroProps {
  data: IMicroData;
  isGroup?: boolean;
  className?: string;
}

export default function Micro({ data, isGroup = true, className }: MicroProps) {
  return (
    <>
      {data.type === MicroTypeEnum.VIDEO ? (
        <MicroVideo data={data} isGroup={isGroup} className={className} />
      ) : data.type === MicroTypeEnum.PRACTICE ? (
        <MicroPractice data={data} className={className} />
      ) : data.type === MicroTypeEnum.TEST ? (
        <MicroTest data={data} className={className} />
      ) : (
        <></>
      )}
    </>
  );
}
