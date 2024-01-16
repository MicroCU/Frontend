"use client";
import CheckList from "@/components/CheckList";
import {
  CheckListItem,
  CheckListItemStatusEnum
} from "@/components/CheckListItem";
import Group from "@/components/Group";
import Micro from "@/components/Micro";
import NavigateBtn from "@/components/NavigateBtn";
import Node, { NodeStatusEnum } from "@/components/Node";
import { RadialProgress } from "@/components/RadialProgress";
import Toast, { ToastTypeEnum } from "@/components/Toast";
import Tag from "@/components/Tag";
import { Button } from "@/components/ui/button";
import NavToolTip from "@/components/NavToolTip";
import TabIcon, {
  TabIconModeEnum,
  TabIconTypeEnum
} from "@/components/TabIcon";
import Next from "@/components/Next";
import Zoom from "@/components/Zoom";
import NoResult, { NoResultTypeEnum } from "@/components/NoResult";
import SearchInput from "@/components/SearchInput";
import LoadingGraph from "@/components/LoadingGraph";
import PathItems from "@/components/PathItems";
import JourneyItems, { JourneyItemsType } from "@/components/JourneyItems";
import PathCard, { PathCardType } from "@/components/PathCard";
import JourneyModalItems, {
  JourneyModalType
} from "@/components/JourneyModalItems";
import CheckListIcon from "@/components/CheckListIcon";
import { GroupTypeEnum, MicroTypeEnum } from "@/types/enum";

export default function TontanComponent() {
  return (
    <>
      <div className=" bg-black flex flex-row gap-4 pl-4">
        <div className="flex flex-col gap-4">
          <p className="text-white"> Not start </p>
          <Micro
            id="1"
            title="Video"
            progress={0}
            type={MicroTypeEnum.VIDEO}
            isGroup={false}
          />
          <Micro
            id="1"
            title="video G"
            progress={0}
            type={MicroTypeEnum.VIDEO}
            isGroup={true}
          />
          <Micro
            id="1"
            title="practice"
            progress={0}
            type={MicroTypeEnum.PRACTICE}
          />
          <Micro id="1" title="test" progress={0} type={MicroTypeEnum.TEST} />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white"> In progress </p>
          <Micro
            id="1"
            title="video30"
            progress={30}
            type={MicroTypeEnum.VIDEO}
          />
          <Micro
            id="1"
            title="video40"
            progress={40}
            type={MicroTypeEnum.VIDEO}
          />
          <Micro
            id="1"
            title="video50"
            progress={50}
            type={MicroTypeEnum.VIDEO}
          />
          <Micro
            id="1"
            title="video80"
            progress={80}
            type={MicroTypeEnum.VIDEO}
          />
          <Micro
            id="1"
            title="practice"
            progress={50}
            type={MicroTypeEnum.PRACTICE}
          />
          <Micro
            id="1"
            title="testlongggggggggggggg"
            progress={50}
            type={MicroTypeEnum.TEST}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-white"> Completed </p>
          <Micro
            id="1"
            title="video"
            progress={100}
            type={MicroTypeEnum.VIDEO}
          />
          <Micro
            id="1"
            title="practice"
            progress={100}
            type={MicroTypeEnum.PRACTICE}
          />
          <Micro id="1" title="test" progress={100} type={MicroTypeEnum.TEST} />
        </div>
      </div>
      <div className="bg-grayMain flex flex-row gap-4 pl-4">
        <Group
          id="G1"
          title="Basic Libraryyyy11112222212333455555577"
          micros={[
            {
              id: "1",
              title: "video 11",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video22",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice",
              progress: 70,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Ordered}
        />
        <Group
          id="G2"
          title="Basic Libraryyyy11112222212333455555577"
          micros={[
            {
              id: "1",
              title: "video 1111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video222222222222222222222222222",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice",
              progress: 70,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            },
            {
              id: "4",
              title: "practice 1",
              progress: 80,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "5",
              title: "practice 2",
              progress: 80,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Ordered}
        />
        <Group
          id="G3"
          title="Basic Library"
          micros={[
            {
              id: "1",
              title: "video 1111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video22222222223114",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice",
              progress: 70,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Ordered}
        />
      </div>
      <div className="bg-grayMain flex flex-column gap-4 pl-4">
        <Group
          id="G4"
          title="Basic Library"
          micros={[
            {
              id: "1",
              title: "video 11111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video222222222",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice",
              progress: 100,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Unordered}
        />
      </div>
      <div className="bg-grayMain flex flex-column gap-4 pl-4">
        <Group
          id="G5"
          title="Basic LibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyy"
          micros={[
            {
              id: "1",
              title: "video 11111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video222222222222222222222222",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice",
              progress: 100,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Unordered}
        />
      </div>
      <div className="bg-grayMain flex flex-column gap-4 pl-4">
        <Group
          id="G6"
          title="Basic LibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyyLibraryyyyyyyyyyyyyy"
          micros={[
            {
              id: "1",
              title: "video11111111111111111111111111111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video222222222222222222222222",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice33333333333333333333333",
              progress: 100,
              type: MicroTypeEnum.PRACTICE,
              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Unordered}
        />
      </div>
      <div className="bg-grayMain flex flex-column gap-4 pl-4">
        <Group
          id="G7"
          title="Basic Library (LONG)"
          micros={[
            {
              id: "1",
              title: "video11111111111111111111111111111111",
              progress: 50,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "2",
              title: "video222222222222222222222222",
              progress: 100,
              type: MicroTypeEnum.VIDEO,
              isGroup: true
            },
            {
              id: "3",
              title: "practice33333333333333333333333",
              progress: 100,
              type: MicroTypeEnum.PRACTICE,

              isGroup: true
            },
            {
              id: "4",
              title: "video",
              progress: 100,
              type: MicroTypeEnum.VIDEO,

              isGroup: true
            },
            {
              id: "5",
              title: "video 1234",
              progress: 100,
              type: MicroTypeEnum.VIDEO,

              isGroup: true
            }
          ]}
          type={GroupTypeEnum.Unordered}
        />
      </div>
      <div className="bg-black flex flex-row gap-4 pl-4">
        <Node status={NodeStatusEnum.CURRENT_PREVIEW} />
        <Node status={NodeStatusEnum.STILL_LEARNING} />
        <Node status={NodeStatusEnum.PASSED_TEST} />
        <Node status={NodeStatusEnum.NOT_VISITED} />
      </div>
      <div className=" bg-white flex flex-row gap-4 pl-4">
        <Button className="w-[112px] h-[35px]"> Go to path 1 </Button>
        <Button variant="secondary" className="w-[252px] h-[43px]">
          {" "}
          Go to path 2{" "}
        </Button>
        <Button variant="ghost" className="w-[112px] h-[35px]">
          {" "}
          Go to path 3{" "}
        </Button>
      </div>
      <div className="bg-primaryLight flex flex-row gap-4 pl-4">
        <RadialProgress progress={0} widthHeight={80} />
        <RadialProgress progress={50} widthHeight={80} />
        <RadialProgress progress={75} widthHeight={80} />
      </div>
      <div className="bg-primaryLight flex flex-row gap-4 p-4">
        <CheckListItem
          journey="Software Engineer"
          paths={[
            "Algorithm Design",
            "ETL",
            "Python",
            "Data Struct",
            "long1long2long3long4long5long6long7"
          ]}
          progress={75}
          status={CheckListItemStatusEnum.SHOWN}
        />
        <CheckListItem
          journey=""
          paths={[]}
          progress={0}
          status={CheckListItemStatusEnum.LOADING}
        />
      </div>
      <div className="bg-white flex flex-row gap-4 p-5">
        <CheckList
          checkListItems={[
            {
              journey: "Software Engineer",
              paths: [
                "Algorithm Design",
                "ETL",
                "Python",
                "Data Struct",
                "long1long2long3"
              ],
              progress: 75,
              status: CheckListItemStatusEnum.SHOWN
            },
            {
              journey: "Basic Programming Language in 2020",
              paths: ["Python Daily", "Intro to Programming World"],
              progress: 25,
              status: CheckListItemStatusEnum.SHOWN
            }
          ]}
          status={CheckListItemStatusEnum.SHOWN}
          className="max-h-[200px]"
        />
        <CheckList
          checkListItems={[]}
          status={CheckListItemStatusEnum.LOADING}
          className="max-h-[200px]"
        />
        <CheckList
          checkListItems={[]}
          status={CheckListItemStatusEnum.COMPLETED}
          className="max-h-[200px]"
        />
        <CheckListIcon />
      </div>
      <div className="bg-white flex flex-col gap-4 p-4">
        <Toast
          message="Your message has been sent."
          type={ToastTypeEnum.INFO}
          buttonTitle="Click me to see toast!"
        />
        <Toast
          message="Your message has been sent."
          type={ToastTypeEnum.SUCCESS}
          buttonTitle="Click me to see toast!"
        />
        <Toast
          title="Uh oh! Something went wrong."
          message="There was a problem with your request."
          type={ToastTypeEnum.ERROR}
          buttonTitle="Click me to see toast!"
        />
        <NavigateBtn />
        <Tag
          title="Capstone"
          imageURL="https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
        />
        <Tag
          title="Software Architecture"
          imageURL="https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
        />
      </div>
      <div className="bg-white flex flex-row gap-4 p-4">
        <NavToolTip mainText="Hover Journey" subText="Journey" />
        <NavToolTip mainText="Hover Recently" subText="Recently" />
        <NavToolTip mainText="Hover Search" subText="Search" />
      </div>
      <div className="bg-progressLight flex flex-row gap-4 p-4">
        <TabIcon type={TabIconTypeEnum.library} mode={TabIconModeEnum.FILLED} />
        <TabIcon type={TabIconTypeEnum.search} mode={TabIconModeEnum.FILLED} />
        <TabIcon type={TabIconTypeEnum.history} mode={TabIconModeEnum.FILLED} />
        <TabIcon
          type={TabIconTypeEnum.library}
          mode={TabIconModeEnum.OUTLINE}
        />
        <TabIcon type={TabIconTypeEnum.search} mode={TabIconModeEnum.OUTLINE} />
        <TabIcon
          type={TabIconTypeEnum.history}
          mode={TabIconModeEnum.OUTLINE}
        />
        <Next />
        <Zoom
          onClickZoomIn={() => {
            alert("Zoom in");
          }}
          onClickZoomOut={() => {
            alert("Zoom out");
          }}
        />
      </div>
      <div className="bg-progressLight flex flex-row gap-4 p-4">
        <NoResult type={NoResultTypeEnum.NoRecentlyPaths} />
        <NoResult type={NoResultTypeEnum.NoResultsFound} />
      </div>
      <div className="bg-progressLight flex flex-col gap-4 p-4">
        <SearchInput defaultValue="Python" />
        <SearchInput
          defaultValue="Python"
          className="w-[200px] border border-black"
        />
      </div>
      <div className="bg-black flex flex-col gap-4 p-4">
        <LoadingGraph />
      </div>
      <div className="bg-progressLight flex flex-col gap-4 p-4">
        <PathItems
          name="Python Basic"
          isSelected={true}
          className="w-[200px]"
        />
        <PathItems
          name="Data Structure"
          isSelected={false}
          className="w-[200px]"
        />
      </div>
      <div className="bg-progressLight flex flex-col gap-4 p-4">
        <JourneyItems
          journeys={[
            {
              id: "1",
              name: "Software Engineer",
              paths: [
                {
                  id: "1",
                  name: "Algorithm Design"
                },
                {
                  id: "2",
                  name: "ETL"
                },
                {
                  id: "3",
                  name: "Python"
                },
                {
                  id: "4",
                  name: "Data Struct"
                },
                {
                  id: "5",
                  name: "long1long2long3long4long5long6long7"
                }
              ]
            },
            {
              id: "21",
              name: "Basic Programming Language in 2020",
              paths: [
                {
                  id: "21",
                  name: "Python Daily"
                },
                {
                  id: "22",
                  name: "Intro to Programming World"
                }
              ]
            }
          ]}
          width={300}
          type={JourneyItemsType.Shown}
        />
        <JourneyItems width={300} type={JourneyItemsType.Loading} />
      </div>
      <div className="bg-progressLight flex flex-col gap-4 p-4">
        <PathCard
          name="Architecture Design"
          description="Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience"
          categories={[
            {
              id: "1",
              name: "Software Engineer",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
            },
            {
              id: "2",
              name: "Software Architecture",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
            }
          ]}
          type={PathCardType.Shown}
        />
        <PathCard
          name="Architecture Design"
          categories={[
            {
              id: "1",
              name: "Software Engineer",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
            },
            {
              id: "2",
              name: "Software Architecture",
              imageURL:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
            }
          ]}
          type={PathCardType.Shown}
        />
        <PathCard type={PathCardType.Loading} />
      </div>
      <div className="bg-progressLight flex flex-col gap-4 p-4">
        <JourneyModalItems
          name="Software Engineer"
          paths={[
            {
              id: "1",
              name: "Algorithm Design",
              description:
                "Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience",
              categories: [
                {
                  id: "11",
                  name: "Software Engineer",
                  imageURL:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
                },
                {
                  id: "12",
                  name: "Software Architecture",
                  imageURL:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
                }
              ]
            },
            {
              id: "2",
              name: "Python Basic",
              description:
                "Explore the dynamic world of prototyping in Figma and learn how this versatile design tool can supercharge your project's user experience",
              categories: [
                {
                  id: "21",
                  name: "Software Engineer",
                  imageURL:
                    "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
                }
              ]
            }
          ]}
          type={JourneyModalType.Shown}
        />
        <JourneyModalItems type={JourneyModalType.Loading} />
      </div>
    </>
  );
}
