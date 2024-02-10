import { GroupType, MicroType, PathStatus } from "./enum";

export type TagData = {
  id: string;
  name: string;
  icon: string;
};

export interface MicroData {
  id: string;
  name: string;
  progress: number;
  type: MicroType;
}

export interface BriefPathInfo {
  id: string
  name: string;
  description: string;
  tags: TagData[];
  picture?: string;
  status: PathStatus
}

export interface UndirectedGraphNodeData {
  status: PathStatus
  pathInfo: BriefPathInfo
}

export interface JourneyData {
  id: string;
  name: string;
  progress: number;
  paths: {
    total: number;
    data: BriefPathInfo[];
  },
}

export interface HomePageData {
  total: number;
  journeys: JourneyData[];
  relationships: {
    id: string;
    neighbor: string[]
  }[];
}

export interface SearchPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbor: string[]
  }[];
}

export interface RecentlyPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbor: string[]
  }[];
}

export interface JourneyStoreData {
  data: JourneyData[];
  relationships: {
    id: string;
    neighbor: string[]
  }[];
}

export interface ErrorAPI {
  status: number
  message: string
}

export interface APIResponse {
  status: number;
  data?: HomePageData | SearchPageData | RecentlyPageData | JourneyData;
  message?: string;
}

export interface Videodata {
  title: string
  link: string
  decisionTitle: string
}

export interface DocumentData {
  name: string
  link: string
}

export interface MicroData {
  id: string
  name: string
  progress: number
  type: MicroType
  video?: Videodata
  documents?: DocumentData[]
}

export interface GroupData {
  id: string,
  name: string,
  nexts: string[],
  type: GroupType,
  micros: MicroData[],
}

export interface PathData {
  id: string,
  name: string,
  description: string,
  tags: TagData[],
  groups: GroupData[],
}

export interface PathAPIResponse {
  status: number,
  data: {
    path: PathData
  }
  message?: string
}