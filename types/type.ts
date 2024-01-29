import { MicroType, NodeStatusEnum } from "./enum";

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
  title: string;
  description: string;
  tags: TagProps[];
}

export interface NodeData {
  status: NodeStatusEnum
  pathInfo: BriefPathInfo
}