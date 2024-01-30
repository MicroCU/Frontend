import { MicroType, PathStatus } from "./enum";

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
  }
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