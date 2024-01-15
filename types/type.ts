import { GroupType, MicroNodeType } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

export interface IMicroNode {
  id: string;
  name: string;
  progress: number;
  type: MicroNodeType;
}

export interface IGroup {
  id: string;
  name: string;
  next: string[];
  type: GroupType;
  members: IMicroNode[];
}

export interface IMockDirectedGraphData {
  groups: IGroup[];
}