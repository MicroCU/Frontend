import { GroupTypeEnum } from "@/types/enum";
import Micro, { IMicroProps } from "./Micro";

export interface IGroupProps {
  title: string;
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ title, micros, type }: IGroupProps) {
  return (
    <>
      {type === GroupTypeEnum.Ordered ? (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center p-4 gap-y-4 rounded-2xl">
          <div className="max-w-52">
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}{" "}
            </p>
          </div>
          {micros.map((micro) => (
            <Micro
              id={micro.id}
              title={micro.title}
              progress={micro.progress}
              type={micro.type}
              status={micro.status}
              isGroup={micro.isGroup}
              key={micro.id}
              className="mx-auto"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col bg-white w-fit h-fit justify-center content-center p-4 gap-y-4 rounded-2xl">
          <div className="max-w-screen-sm">
            <p className="uppercase Bold16 text-progress overflow-hidden whitespace-nowrap overflow-ellipsis">
              {" "}
              {title}{" "}
            </p>
          </div>
          <div className="flex flex-row bg-white w-fit h-fit justify-center content-center gap-x-4 rounded-2xl">
            {micros.map((micro) => (
              <Micro
                id={micro.id}
                title={micro.title}
                progress={micro.progress}
                type={micro.type}
                status={micro.status}
                isGroup={micro.isGroup}
                key={micro.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
