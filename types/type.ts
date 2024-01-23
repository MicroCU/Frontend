import { GroupTypeEnum, MicroTypeEnum } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

export interface IMicroData {
  id: string;
  name: string;
  progress: number;
  type: MicroTypeEnum;
}

export interface IGroupData {
  id: string;
  name: string;
  next: string[];
  type: GroupTypeEnum;
  members: IMicroData[];
}

export interface IMockDirectedGraphData {
  groups: IGroupData[];
}

export type User = {
  id: string;
  name: string;
};
