import Micro, { MicroStatusEnum, MicroTypeEnum } from "@/components/micro";

export default function TontanComponent() {
  return (
    <div className=" bg-black flex flex-col gap-4 pl-4">
      <p className="text-stone-50"> Not start </p>
      <Micro title="Video" progress={0} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.NOT_STARTED} isGroup={false}  />
      <Micro title="video G" progress={0} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.NOT_STARTED} isGroup={true}  />
      <Micro title="practice" progress={0} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.NOT_STARTED}  />
      <Micro title="test" progress={0} type={MicroTypeEnum.TEST} status={MicroStatusEnum.NOT_STARTED} />
      <p> ------------------------- </p>
      <p className="text-stone-50"> In progress </p>
      <Micro title="video30" progress={30} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
      <Micro title="video40" progress={40} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
      <Micro title="video50" progress={50} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
      <Micro title="video80" progress={80} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
      <Micro title="practice" progress={50} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.IN_PROGRESS} />
      <Micro title="testlongggggggggggggg" progress={50} type={MicroTypeEnum.TEST} status={MicroStatusEnum.IN_PROGRESS} />
      <p> ------------------------- </p>
      <p className="text-stone-50"> Completed </p>
      <Micro title="video" progress={100} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.COMPLETED} />
      <Micro title="practice" progress={100} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.COMPLETED} />
      <Micro title="test" progress={100} type={MicroTypeEnum.TEST} status={MicroStatusEnum.COMPLETED} />
    </div>
  );
}
