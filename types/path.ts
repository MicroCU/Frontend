import { Edge, Node } from "reactflow";
import { GroupDisplay, GroupType, MicroType } from "./enum";
import { DocumentData, Testdata, Videodata } from "./type";

export interface Micro {
  id: string;
  name: string;
  progress: number;
  type: MicroType;
  video?: Videodata;
  documents?: DocumentData[];
  test?: Testdata;
}

export interface Group {
  name: string;
  type: GroupType;
  micros: Micro[];
  force?: { x: number; y: number };
  velocity?: { x: number; y: number };
  level?: number;
}

export interface Path {
  groups: Group[];
}

export type PathNode = Node<Group, GroupDisplay>;
export type PathEdge = Edge<undefined>;
