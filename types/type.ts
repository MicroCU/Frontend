import { MicroType, PathStatus } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

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
  progress: number;
  type: MicroType;
}

export interface BriefPathInfo {
  id: string;
  name: string;
  description: string;
  tags: TagData[];
  picture?: string;
  status: PathStatus;
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
    neighbor: string[];
  }[];
}

export interface SearchPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbor: string[];
  }[];
}

export interface RecentlyPageData {
  total: number;
  data: BriefPathInfo[];
  relationships: {
    id: string;
    neighbor: string[];
  }[];
}

export interface JourneyStoreData {
  data: JourneyData[];
  relationships: {
    id: string;
    neighbor: string[];
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
