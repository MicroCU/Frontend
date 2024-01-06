import Group, { GroupTypeEnum } from "@/components/group";
import Micro, { MicroStatusEnum, MicroTypeEnum } from "@/components/micro";

export default function TontanComponent() {
    return (
        <>
            <div className=" bg-black flex flex-col gap-4 pl-4">
                <p className="text-white"> Not start </p>
                <Micro id="1" title="Video" progress={0} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.NOT_STARTED} isGroup={false} />
                <Micro id="1" title="video G" progress={0} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.NOT_STARTED} isGroup={true} />
                <Micro id="1" title="practice" progress={0} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.NOT_STARTED} />
                <Micro id="1" title="test" progress={0} type={MicroTypeEnum.TEST} status={MicroStatusEnum.NOT_STARTED} />
                <p> ------------------------- </p>
                <p className="text-white"> In progress </p>
                <Micro id="1" title="video30" progress={30} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
                <Micro id="1" title="video40" progress={40} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
                <Micro id="1" title="video50" progress={50} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
                <Micro id="1" title="video80" progress={80} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.IN_PROGRESS} />
                <Micro id="1" title="practice" progress={50} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.IN_PROGRESS} />
                <Micro id="1" title="testlongggggggggggggg" progress={50} type={MicroTypeEnum.TEST} status={MicroStatusEnum.IN_PROGRESS} />
                <p> ------------------------- </p>
                <p className="text-white"> Completed </p>
                <Micro id="1" title="video" progress={100} type={MicroTypeEnum.VIDEO} status={MicroStatusEnum.COMPLETED} />
                <Micro id="1" title="practice" progress={100} type={MicroTypeEnum.PRACTICE} status={MicroStatusEnum.COMPLETED} />
                <Micro id="1" title="test" progress={100} type={MicroTypeEnum.TEST} status={MicroStatusEnum.COMPLETED} />
            </div>
            <div className="bg-grayMain flex flex-row gap-4 pl-4">
                <Group micros={[
                    {
                        id: "1",
                        title: 'video 1',
                        progress: 50,
                        type: MicroTypeEnum.VIDEO,
                        status: MicroStatusEnum.IN_PROGRESS,
                        isGroup: true,
                    },
                    {
                        id: "2",
                        title: 'video 2',
                        progress: 100,
                        type: MicroTypeEnum.VIDEO,
                        status: MicroStatusEnum.COMPLETED,
                        isGroup: true,
                    },
                    {
                        id: "3",
                        title: 'practice',
                        progress: 70,
                        type: MicroTypeEnum.PRACTICE,
                        status: MicroStatusEnum.IN_PROGRESS,
                        isGroup: true,
                    },
                ]} type={GroupTypeEnum.Ordered} />
                <Group micros={[
                    {
                        id: "1",
                        title: 'video 1',
                        progress: 50,
                        type: MicroTypeEnum.VIDEO,
                        status: MicroStatusEnum.IN_PROGRESS,
                        isGroup: true,
                    },
                    {
                        id: "2",
                        title: 'video 2',
                        progress: 100,
                        type: MicroTypeEnum.VIDEO,
                        status: MicroStatusEnum.COMPLETED,
                        isGroup: true,
                    },
                    {
                        id: "3",
                        title: 'practice',
                        progress: 100,
                        type: MicroTypeEnum.PRACTICE,
                        status: MicroStatusEnum.COMPLETED,
                        isGroup: true,
                    },
                ]} type={GroupTypeEnum.Unordered} />
            </div>
        </>
    );
}
