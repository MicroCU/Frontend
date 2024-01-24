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

export interface NodeData {
  name: string;
  status: NodeStatusEnum
}