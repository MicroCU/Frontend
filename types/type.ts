import { GroupTypeEnum, MicroTypeEnum } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

export interface MicroData {
  id: string;
  name: string;
  progress: number;
  type: MicroTypeEnum;
}

export interface GroupData {
  id: string;
  name: string;
  next: string[];
  type: GroupTypeEnum;
  members: MicroData[];
}

export interface MockDirectedGraphData {
  groups: GroupData[];
}