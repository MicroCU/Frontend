import { Edge, Node } from "reactflow";
import { GroupDisplay, GroupType, MicroType } from "./enum";

export interface Micro {
  id: string;
  title: string;
  progress: number;
  type: MicroType;
}

export interface Group {
  id: string;
  name: string;
  next: string[];
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
