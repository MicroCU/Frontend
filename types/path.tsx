import { Edge, Node } from "reactflow";

export enum MicroType {
  VIDEO = "VIDEO",
  PRACTICE = "PRACTICE",
  TEST = "TEST"
}

export interface Micro {
  id: string;
  title: string;
  progress: number;
  type: MicroType;
}

export enum GroupType {
  Single = "Single",
  Ordered = "Ordered",
  Unordered = "Unordered"
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

export type PathNode = Node<Group, GroupType>;
export type PathEdge = Edge<undefined>;
