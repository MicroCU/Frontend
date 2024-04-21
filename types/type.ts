import { GroupType, MicroType, PathStatus } from "./enum";

export type User = {
  id: string;
  name: string;
};

export type TagData = {
  id: string;
  name: string;
  icon: string;
};

export interface MicroData {
  id: string;
  name: string;
  total_progress: number;
  type: MicroType;
  video?: Videodata;
  documents?: DocumentData[];
  test?: Testdata;
}

export interface BriefPathInfo {
  id: string;
  name: string;
  description: string;
  tags: TagData[];
  picture?: string;
  progress: number;
}

export interface UndirectedGraphNodeData {
  status: PathStatus;
  pathInfo: BriefPathInfo;
}

export interface JourneyData {
  id: string;
  name: string;
  progress: number;
  paths: {
    total: number;
    data: BriefPathInfo[];
  };
}

export interface HomePageData {
  total: number;
  journeys: JourneyData[];
  relationships: {
    id: string;
    neighbors: string[];
  }[];
}

export interface SearchPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbors: string[];
  }[];
}

export interface RecentlyPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbors: string[];
  }[];
}

export interface JourneyStoreData {
  data: JourneyData[];
  relationships: {
    id: string;
    neighbors: string[];
  }[];
}

export interface ErrorAPI {
  status: number;
  message: string;
}

export interface APIResponse {
  status: number;
  data?: HomePageData | SearchPageData | RecentlyPageData | JourneyData;
  message?: string;
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

export interface Videodata {
  id: string
  title: string
  link: string
  decisionTitle: string | null
  progress: number
}

export interface DocumentData {
  id: string
  name: string
  link: string
}

export interface Testdata {
  id: string
  link: string
}