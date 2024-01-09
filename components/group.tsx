import Micro, { IMicroProps } from "./Micro";

export enum GroupTypeEnum {
  Unordered = 1,
  Ordered = 2
}

export interface IGroupProps {
  micros: IMicroProps[];
  type: GroupTypeEnum;
}

export default function Group({ micros, type }: IGroupProps) {
  return (
    <>
      {type === GroupTypeEnum.Ordered ? (
        <div className="flex flex-col bg-white w-fit h-fit content-center p-4 gap-y-4 rounded-2xl">
          {micros.map((micro) => (
            <div key={micro.id} className="">
              <Micro
                id={micro.id}
                title={micro.title}
                progress={micro.progress}
                type={micro.type}
                status={micro.status}
                isGroup={micro.isGroup}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row bg-white w-fit h-[75px] justify-center p-4 gap-x-4 rounded-2xl">
          {micros.map((micro) => (
            <div key={micro.id}>
              <Micro
                id={micro.id}
                title={micro.title}
                progress={micro.progress}
                type={micro.type}
                status={micro.status}
                isGroup={micro.isGroup}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
