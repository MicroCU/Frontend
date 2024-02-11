import { GroupType, MicroType, Path } from "@/types/path";

export const mockData: Path[] = [
  {
    groups: [
      {
        id: "1",
        name: "Overview",
        next: ["2"],
        type: GroupType.Single,
        micros: [
          { id: "1", title: "Overview", progress: 50, type: MicroType.VIDEO }
        ]
      },
      {
        id: "2",
        name: "Comment",
        next: [],
        type: GroupType.Ordered,
        micros: [
          {
            id: "21",
            title: "Comment 1",
            progress: 10,
            type: MicroType.PRACTICE
          },
          {
            id: "22",
            title: "Comment 2",
            progress: 20,
            type: MicroType.PRACTICE
          },
          {
            id: "23",
            title: "Comment 3",
            progress: 30,
            type: MicroType.PRACTICE
          }
        ]
      }
    ]
  },
  {
    groups: [
      {
        id: "1",
        name: "Overview",
        next: ["2"],
        type: GroupType.Single,
        micros: [
          { id: "1", title: "Overview", progress: 50, type: MicroType.VIDEO }
        ]
      },
      {
        id: "2",
        name: "Comment",
        next: ["3"],
        type: GroupType.Ordered,
        micros: [
          {
            id: "21",
            title: "Comment 1",
            progress: 10,
            type: MicroType.PRACTICE
          },
          {
            id: "22",
            title: "Comment 2",
            progress: 20,
            type: MicroType.PRACTICE
          },
          {
            id: "23",
            title: "Comment 3",
            progress: 30,
            type: MicroType.PRACTICE
          }
        ]
      },
      {
        id: "3",
        name: "Quiz",
        next: ["4"],
        type: GroupType.Unordered,
        micros: [
          {
            id: "31",
            title: "Quiz 1",
            progress: 40,
            type: MicroType.TEST
          },
          {
            id: "32",
            title: "Quiz 2",
            progress: 50,
            type: MicroType.TEST
          },
          {
            id: "33",
            title: "Quiz 3",
            progress: 60,
            type: MicroType.TEST
          }
        ]
      },
      {
        id: "4",
        name: "Summary",
        next: [],
        type: GroupType.Single,
        micros: [
          { id: "4", title: "Summary", progress: 70, type: MicroType.VIDEO }
        ]
      }
    ]
  },
  {
    groups: [
      {
        id: "1",
        name: "Overview",
        next: ["2", "3", "4"],
        type: GroupType.Single,
        micros: [
          { id: "1", title: "Overview", progress: 50, type: MicroType.VIDEO }
        ]
      },
      {
        id: "2",
        name: "Comment",
        next: [],
        type: GroupType.Ordered,
        micros: [
          {
            id: "21",
            title: "Comment 1",
            progress: 10,
            type: MicroType.PRACTICE
          },
          {
            id: "22",
            title: "Comment 2",
            progress: 20,
            type: MicroType.PRACTICE
          },
          {
            id: "23",
            title: "Comment 3",
            progress: 30,
            type: MicroType.PRACTICE
          }
        ]
      },
      {
        id: "3",
        name: "Quiz",
        next: [],
        type: GroupType.Unordered,
        micros: [
          {
            id: "31",
            title: "Quiz 1",
            progress: 40,
            type: MicroType.TEST
          },
          {
            id: "32",
            title: "Quiz 2",
            progress: 50,
            type: MicroType.TEST
          },
          {
            id: "33",
            title: "Quiz 3",
            progress: 60,
            type: MicroType.TEST
          }
        ]
      },
      {
        id: "4",
        name: "Summary",
        next: [],
        type: GroupType.Single,
        micros: [
          { id: "4", title: "Summary", progress: 70, type: MicroType.VIDEO }
        ]
      }
    ]
  }
];