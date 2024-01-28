import { MicroType } from "./enum";

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

export type User = {
  id: string;
  name: string;
};
