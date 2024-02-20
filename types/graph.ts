import { Edge, Node } from "reactflow";
import { PathDisplay, PathStatus, UndirectedNodeType } from "./enum";
import { BriefPathInfo } from "./type";

export interface Path {
  pathInfo: BriefPathInfo,
  status: PathStatus;
  force?: { x: number; y: number };
  velocity?: { x: number; y: number };
}

export interface Graph {
  paths: Path[];
}

export type GraphNode = Node<Path, PathDisplay>;
export type GraphEdge = Edge<undefined>;
