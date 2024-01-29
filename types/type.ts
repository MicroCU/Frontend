import { MicroType, PathStatus } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

export interface MicroData {
  id: string;
  name: string;
  progress: number;
  type: MicroType;
}

export interface BriefPathInfo {
  id: string
  title: string;
  description: string;
  tags: TagProps[];
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
  paths: BriefPathInfo[];
}