import { GroupType, MicroType } from "./enum";

export type TagProps = {
  imageURL: string;
  title: string;
};

export type TagData = {
  id: string;
  name: string;
  icon: string;
};

export interface Videodata {
  title: string
  link: string
  decisionTitle: string
}

export interface DocumentData {
  name: string
  link: string
}

export interface MicroData {
  id: string
  name: string
  progress: number
  type: MicroType
  video: Videodata
  documents: DocumentData[]
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

export interface APIResponse {
  status: number,
  data: {
    path: PathData
  }
  message?: string
}